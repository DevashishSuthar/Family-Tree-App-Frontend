import Axios from '../configs/AxiosConfig';
import { FAMILY_ENDPOINTS } from '../constants/ApiEndpointsContstant';

export const createFamily = (data) => {
    return Axios.post(FAMILY_ENDPOINTS.createFamily, data);
};

export const deleteFamily = (familyRef) => {
    return Axios.delete(FAMILY_ENDPOINTS.deleteFamily(familyRef));
};

export const getMembersOfFamily = (familyRef) => {
    return Axios.get(FAMILY_ENDPOINTS.getMembersOfFamily(familyRef));
};

export const getAllFamilies = () => {
    return Axios.get(FAMILY_ENDPOINTS.getAllFamilies);
};