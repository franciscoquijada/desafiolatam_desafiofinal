import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import { combineReducers } from 'redux';

import reducerProduct from '../store/modules/product';
import rootReducer from './modules/auth';

const reducers = combineReducers({
    products: reducerProduct,
    auth: rootReducer
});

const store = createStore(
    reducers,
    applyMiddleware(logger, thunk)
);

export default store;





