import React, { useRef, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core';
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
                    <div className="form-group">
                        <label htmlFor="porfilePhoto">Select Profile Photo</label>
                        <input type="file" id="profilePhoto" ref={imageFileRef} onChange={handleImageFileChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            variant="outlined"
                            value={values.name}
                            onChange={handleChange}
                            fullWidth
                        />
                        {errors.name && touched.name && (
                            <span className="error-span">{errors.name}</span>
                        )}
                    </div>
                    <div className="radio-group">
                        <FormControl>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup row>
                                <FormControlLabel
                                    value="MALE"
                                    name="gender"
                                    control={<Radio color="primary" />}
                                    label="Male"
                                    onChange={handleChange}
                                />
                                <FormControlLabel
                                    value="FEMALE"
                                    name="gender"
                                    control={<Radio color="primary" />}
                                    label="Female"
                                    onChange={handleChange}
                                />
                            </RadioGroup>
                            {errors.gender && touched.gender && (
                                <span className="error-span">{errors.gender}</span>
                            )}
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} color="primary" autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateMember;