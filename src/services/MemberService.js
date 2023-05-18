import Axios from '../configs/AxiosConfig';
import { MEMBER_ENDPOINTS } from '../constants/ApiEndpointsContstant';

export const createMember = (data) => {
    return Axios.post(MEMBER_ENDPOINTS.createMember, data);
};