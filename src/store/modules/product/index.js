import { combineReducers } from 'redux';

import reducerProduct from '../product/product.reducer';

const productReducer = combineReducers({
    getAll: reducerProduct
});

export default productReducer;