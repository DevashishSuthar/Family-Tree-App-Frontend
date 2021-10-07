import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useFormik } from 'formik';

import { JPEG, JPG, PNG } from '../../constants/FileExtensionsConstant';
import { createMember } from '../../services/MemberService';
import { showSuccessToastMessage, showErrorToastMessage } from '../../utils/ToastUtils';
import { createMemberSchema } from '../../validators/MemberValidator';

const CreateMember = ({ handleClose, isOpen, selectedMemberData, getMembersOfFamilyAction }) => {
    const imageFileRef = useRef();
    const [selectedImageFile, setSelectedImageFile] = useState(null);

    const handleSubmitAction = async (data) => {
        try {
            const { name, gender } = data;
            const { _id: parentMemberRef, familyRef } = selectedMemberData;
            const formData = new FormData();
            if (selectedImageFile) {
                formData.append('img', selectedImageFile);
            }
            formData.append('name', name);
            formData.append('gender', gender);
            formData.append('familyRef', familyRef);
            formData.append('parentMemberRef', parentMemberRef);
            const response = await createMember(formData);
            const { data: responseData } = response;
            if (responseData) {
                const { success, message } = responseData;
                if (success) {
                    showSuccessToastMessage(message);
                    getMembersOfFamilyAction();
                } else {
                    showErrorToastMessage(message);
                }
            }
            handleClose();
        } catch (error) {
        }
    };

    const handleImageFileChange = (evt) => {
        const file = evt.target.files[0];
        if (file) {
            const { name } = file;
            const fileNameArr = name.split('.');
            const fileExt = fileNameArr[fileNameArr.length - 1].toLowerCase();
            if (fileExt === JPG || fileExt === JPEG || fileExt === PNG) {
                setSelectedImageFile(file);
            } else {
                showErrorToastMessage('Please upload .jpeg, .jpg or .png files.');
                imageFileRef.current.value = '';
                setSelectedImageFile(null);
            }
        }
    };

    const initialValues = {
        name: '',
        gender: ''
    };

    const formik = useFormik({
        initialValues,
        onSubmit: handleSubmitAction,
        validationSchema: createMemberSchema
    });

    const { handleChange, handleSubmit, values, errors, touched } = formik;

    return (
        <>
            <Dialog open={isOpen} >
                <DialogTitle>Create Member Form</DialogTitle>
                <DialogContent>
                    <label htmlFor="porfilePhoto">Select Profile Photo</label>
                    <input type="file" id="profilePhoto" ref={imageFileRef} onChange={handleImageFileChange} />
                    <br />
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={handleChange}
                        value={values.name}
                    />
                    <br />
                    {errors.name && touched.name && (
                        <span className="error-span">{errors.name}</span>
                    )}
                    <br />
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <label htmlFor="male" >
                            <input
                                id="male"
                                name="gender"
                                type="radio"
                                onChange={handleChange}
                                value="MALE"
                            />
                            Male
                        </label>
                        <label htmlFor="female" >
                            <input
                                id="female"
                                name="gender"
                                type="radio"
                                onChange={handleChange}
                                value="FEMALE"
                            />
                            Female
                        </label>
                        <br />
                        {errors.gender && touched.gender && (
                            <span className="error-span">{errors.gender}</span>
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateMember;