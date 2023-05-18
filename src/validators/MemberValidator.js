import * as Yup from 'yup';

export const createMemberSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    gender: Yup.string().oneOf(['MALE', 'FEMALE']).required('Please select gender'),
});