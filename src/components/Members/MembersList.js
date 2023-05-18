import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import CreateMember from './CreateMember';
import { REACT_APP_BASE_URL } from '../../configs/EnvConfig';
import { IMG_DEFAULT_AVATAR } from '../../constants/ImagesConstant';
import { getMembersOfFamily } from '../../services/FamilyService';
import { showSuccessToastMessage, showErrorToastMessage } from '../../utils/ToastUtils';

const MembersList = () => {
    const { id: familyRef } = useParams();
    const [membersArr, setMembersArr] = useState([]);
    const [membersWithChildrensArr, setMembersWithChildrensArr] = useState([]);
    const [isCreateMemberDialog, setIsCreateMemberDialog] = useState(false);
    const [selectedMemberData, setSelectedMemberData] = useState({});

    const getMembersOfFamilyAction = async () => {
        try {
            const response = await getMembersOfFamily(familyRef);
            const { data: responseData } = response;
            if (responseData) {
                const { success, message, data } = responseData;
                if (success) {
                    showSuccessToastMessage(message);
                    setMembersArr(data.members);
                } else {
                    showErrorToastMessage(message);
                }
            }
        } catch (error) {
        }
    };

    const getFamiliesArrWithChildrens = (familyArr, id = null) => {
        return familyArr.filter(familyObj => familyObj.parentMemberRef?._id.toString() === id?.toString())
            .map(familyObj => ({
                ...familyObj,
                childrens: getFamiliesArrWithChildrens(familyArr, familyObj._id)
            }));
    };

    useEffect(() => {
        if (!membersArr.length) {
            getMembersOfFamilyAction();
        }
    }, []);

    useEffect(() => {
        if (membersArr.length) {
            const membersWithChildren = getFamiliesArrWithChildrens(membersArr);
            setMembersWithChildrensArr(membersWithChildren);
        }
    }, [membersArr]);

    const handleNodeClick = (memberObj) => {
        setIsCreateMemberDialog(true);
        setSelectedMemberData(memberObj);
    };

    const renderFamilyChildrenRecursively = (familyMembersWithChildrensArr) => {
        return (
            <>
                {familyMembersWithChildrensArr.length ? familyMembersWithChildrensArr.map((memberObj) => {
                    return (
                        <div className="_treeRoot d_f" key={memberObj._id}>
                            < div className={`_treeBranch ${memberObj.childrens && memberObj.childrens.length ? 'hasChildren' : null}`} >
                                < div className="_treeRaw d_f" >
                                    < div className="_treeLeaf d_f" >
                                        < div className="t_Data d_f" onClick={() => handleNodeClick(memberObj)} >
                                            <img src={memberObj.profilePhoto ? `${REACT_APP_BASE_URL}/${memberObj.profilePhoto}` : IMG_DEFAULT_AVATAR} alt="img" className="profile-photo" />
                                            <p className="shortName">{memberObj.name}</p>
                                        </div >
                                    </div>
                                </div >
                                {memberObj.childrens && memberObj.childrens.length ?
                                    (< div className="_NewBranch d_f" > {
                                        renderFamilyChildrenRecursively(memberObj.childrens)
                                    } </div>) : null
                                }
                            </div >
                        </div>)
                }) : null}
            </>
        );
    };

    return (
        <>
            <h2>Members List</h2>
            {membersWithChildrensArr && membersWithChildrensArr.length ?
                (<section className="treeMainContainer">
                    <div className="treeContainer d_f">
                        <div className="_NewBranch d_f">
                            <div className="_treeRoot d_f">
                                <div className="_treeBranch hasChildren">
                                    {renderFamilyChildrenRecursively(membersWithChildrensArr)}
                                </div >
                            </div>
                        </div >
                    </div>
                </section >) : null
            }
            {isCreateMemberDialog &&
                <CreateMember isOpen={isCreateMemberDialog}
                    handleClose={() => setIsCreateMemberDialog(false)}
                    selectedMemberData={selectedMemberData}
                    getMembersOfFamilyAction={getMembersOfFamilyAction}
                />}
        </>
    );
};

export default MembersList;