import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css'

import { getAllFamilies, deleteFamily } from '../../services/FamilyService';
import { showSuccessToastMessage, showErrorToastMessage } from '../../utils/ToastUtils';
import CreateFamily from './CreateFamily';
import DeleteConfirmationDialog from '../Dialog/DeleteConfirmationDialog';

const FamilyList = () => {
    const [familyArr, setFamilyArr] = useState([]);
    const [isFamilyCreateDialog, setIsFamilyCreateDialog] = useState(false);
    const [isFamilyDeleteDialog, setIsFamilyDeleteDialog] = useState(false);
    const [familyData, setFamilyData] = useState({});

    const getAllFamiliesAction = async () => {
        try {
            const response = await getAllFamilies();
            const { data: responseData } = response;
            if (responseData) {
                const { success, message, data } = responseData;
                if (success) {
                    showSuccessToastMessage(message);
                    setFamilyArr(data.families);
                } else {
                    showErrorToastMessage(message);
                }
            }
        } catch (error) {
        }
    };

    const deleteFamilyAction = async () => {
        try {
            const response = await deleteFamily(familyData._id);
            const { data: responseData } = response;
            if (responseData) {
                const { success, message } = responseData;
                if (success) {
                    showSuccessToastMessage(message);
                    getAllFamiliesAction();
                } else {
                    showErrorToastMessage(message);
                }
            }
            setIsFamilyDeleteDialog(false);
        } catch (error) {
        }
    };

    useEffect(() => {
        if (!familyArr.length) {
            getAllFamiliesAction();
        }
    }, []);

    const handleDeleteAction = (row) => {
        setIsFamilyDeleteDialog(true);
        setFamilyData(row);
    };

    const handleCancelOfDeleteAction = () => {
        setIsFamilyDeleteDialog(false);
        setFamilyData({});
    };

    const columns = [{
        Header: 'ID',
        accessor: '_id',
        Cell: ({ row }) => <a href={`/families-list/${row._id}/members`}>{row._id}</a>
    },
    {
        Header: 'Family Name',
        accessor: 'familyName',
    },
    {
        Header: 'Total Members',
        accessor: 'totalMembers',
    },
    {
        Header: 'Action',
        Cell: (row) => <button onClick={() => handleDeleteAction(row.original)}>DELETE</button>
    }];

    const handleFamilyCreate = () => {
        setIsFamilyCreateDialog(true);
    };

    return (
        <>
            <button onClick={handleFamilyCreate}>Create Family</button>
            <div style={{ height: 400, width: '100%' }}>
                <ReactTable
                    data={familyArr}
                    columns={columns}
                />
            </div>
            {isFamilyCreateDialog && <CreateFamily
                handleClose={() => setIsFamilyCreateDialog(false)}
                isOpen={isFamilyCreateDialog}
                getAllFamiliesAction={getAllFamiliesAction}
            />}
            {isFamilyDeleteDialog && <DeleteConfirmationDialog
                isOpen={isFamilyDeleteDialog}
                handleClose={handleCancelOfDeleteAction}
                handleSubmit={deleteFamilyAction}
            />}
        </>
    );
};

export default FamilyList;