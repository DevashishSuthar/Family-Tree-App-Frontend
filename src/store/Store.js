import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';

import RootReducer from './RootReducer';

const composeEnhancers = compose;
const middlewares = [thunk];
const enhancers = composeEnhancers(applyMiddleware(...middlewares));

export const store= createStore(RootReducer, enhancers);