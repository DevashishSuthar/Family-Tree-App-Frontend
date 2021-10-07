import { SHOW_LOADER, HIDE_LOADER } from './LoaderActionTypes';

const initialState = {
    isLoading: false
};

const LoaderReducer = (state = initialState, { type }) => {
    switch (type) {
        case SHOW_LOADER:
            return {
                ...state,
                isLoading: true
            };
        case HIDE_LOADER:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};

export default LoaderReducer;