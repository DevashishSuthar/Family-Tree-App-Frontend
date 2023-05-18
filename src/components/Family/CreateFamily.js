import React from 'react';
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
} from "@material-ui/core";
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
    } catch (error) { }
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
          <div className="form-group">
            <label htmlFor="familyName">Family Name</label>
            <TextField
              id="familyName"
              label="Name"
              variant="outlined"
              value={values.familyName}
              onChange={handleChange}
              fullWidth
            />
            {errors.familyName && touched.familyName && (
              <span className="error-span">{errors.familyName}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="familyHeadPersonName">
              Family Head Person Name
            </label>
            <TextField
              id="familyHeadPersonName"
              label="Head Person Name"
              variant="outlined"
              value={values.familyHeadPersonName}
              onChange={handleChange}
              fullWidth
            />
            {errors.familyHeadPersonName && touched.familyHeadPersonName && (
              <span className="error-span">{errors.familyHeadPersonName}</span>
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

export default CreateFamily;