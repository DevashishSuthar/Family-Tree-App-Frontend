import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { useFormik } from 'formik';

import { createFamily } from '../../services/FamilyService';
import { createFamilySchema } from '../../validators/FamilyValidator';
import { showSuccessToastMessage, showErrorToastMessage } from '../../utils/ToastUtils';

const CreateFamily = ({ handleClose, getAllFamiliesAction, isOpen }) => {
  const handleSubmitAction = async (data) => {
    try {
      const response = await createFamily(data);
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
      handleClose();
    } catch (error) {
    }
  };

  const initialValues = {
    familyName: '',
    familyHeadPersonName: '',
    gender: ''
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmitAction,
    validationSchema: createFamilySchema
  });

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  return (
    <>
      <Dialog open={isOpen} >
        <DialogTitle>Create Family Form</DialogTitle>
        <DialogContent>
          <label htmlFor="familyName">Family Name</label>
          <input
            id="familyName"
            name="familyName"
            type="text"
            onChange={handleChange}
            value={values.familyName}
          />
          <br />
          {errors.familyName && touched.familyName && (
            <span className="error-span">{errors.familyName}</span>
          )}
          <br />
          <label htmlFor="familyHeadPersonName">Family Head Person Name</label>
          <input
            id="familyHeadPersonName"
            name="familyHeadPersonName"
            type="text"
            onChange={handleChange}
            value={values.familyHeadPersonName}
          />
          <br />
          {errors.familyHeadPersonName && touched.familyHeadPersonName && (
            <span className="error-span">{errors.familyHeadPersonName}</span>
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

export default CreateFamily;