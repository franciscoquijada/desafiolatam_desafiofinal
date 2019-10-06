import { productsGetAll, productsCreate, productDelete, productEdit } from './../../../services/product.services';
import { START, SUCCESS, ERROR } from './product.const';


const productActionStart = () => ({
    type: START,
    payload: null
})
const productActionSuccess = (data) => ({
    type: SUCCESS,
    payload: data
})
const productActionError = (data) => ({
    type: ERROR,
    payload: data
})

export const productAsyncCreatorGetAll = () => {
    return (dispatch) => {
        dispatch(productActionStart());
        productsGetAll().then(res => {
            dispatch(productActionSuccess(res.data.data));
        }).catch(error => {
            dispatch(productActionError(error.data))
        })
    }
}

export const productAsyncCreate = (data) => {
    return (dispatch) => {
        dispatch(productActionStart());
        productsCreate(data).then(res => {
            dispatch(productActionSuccess());
        }).catch(error => {
            dispatch(productActionError(error.data));
        });
    }
}

export const productAsyncDelete = (data) => {
    return (dispatch) => {
        dispatch(productActionStart());
        const token = localStorage.getItem('token');
        productDelete(data, token).then(res => {
            dispatch(productAsyncCreatorGetAll());
            dispatch(productActionSuccess());
        }).catch(error => {
            dispatch(productActionError(error.data));
        });
    }
}

export const productAsyncEdit = (data) => {
    return (dispatch) => {
        dispatch(productActionStart());
        productEdit(data).then(res => {
            dispatch(productActionSuccess());
        }).catch(error => {
            dispatch(productActionError(error.data));
        });
    }
}