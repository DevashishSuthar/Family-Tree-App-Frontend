import * as Yup from 'yup';

export const createFamilySchema = Yup.object().shape({
    familyName: Yup.string().required('Family name is required'),
    familyHeadPersonName: Yup.string().required('Family head person name is required'),
    gender: Yup.string().oneOf(['MALE', 'FEMALE']).required('Please select gender')
});