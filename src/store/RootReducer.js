import { combineReducers } from 'redux';

import LoaderReducer from '../screens/Common/Loader/LoaderReducer';

const RootReducer = combineReducers({
    loaderData: LoaderReducer
});

export default RootReducer;