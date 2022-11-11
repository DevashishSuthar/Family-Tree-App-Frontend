import axios from 'axios';

import { REACT_APP_API_URL } from './EnvConfig';
import { showLoader, hideLoader } from '../screens/Common/Loader/LoaderSlice';
import store from '../store/Store';
import { showErrorToastMessage } from '../utils/ToastUtils';

const axiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        store.dispatch(showLoader());

        return config;
    },
    (error) => {
        store.dispatch(hideLoader());
        Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(hideLoader());
        return response;
    },
    (error) => {
        const { data } = error.response || {};
        const { message } = data;
        showErrorToastMessage(message);
        store.dispatch(hideLoader());
        return error;
    }
);

export default axiosInstance;