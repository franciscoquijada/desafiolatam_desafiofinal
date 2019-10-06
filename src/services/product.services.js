import axios from 'axios';
import { apiHost } from '../configure';

class ApiError extends Error { }
const prevJwt = localStorage.getItem('token');

export const productsGetAll = async (data) => {
    try {
        return await axios.get(`${apiHost}/api/product`, {
            headers: {
                authorization: `bearer ${prevJwt}`,
            },
        });
    } catch (error) {
        const status = error.response.status;
        if (status === 404) throw new ApiError('404');
        throw new ApiError(error.message);
    }
};

export const productsCreate = async (data) => {
    try {
        return await axios.post(`${apiHost}/api/product/`, data, {
            headers: {
                authorization: `bearer ${prevJwt}`,
                data: data,
            },
        });
    } catch (error) {
        const status = error.response.status;
        if (status === 404) throw new ApiError('404');
        throw new ApiError(error.message);
    }
};

export const productDelete = async (data, token) => {
    try {
        console.log(' toekn ', token);
        return await axios.delete(`${apiHost}/api/product/${data.id}`, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
    } catch (error) {
        const status = error.response.status;
        if (status === 404) throw new ApiError('404');
        throw new ApiError(error.message);
    }
};

export const productEdit = async (data) => {
    try {
        return await axios.put(`${apiHost}/api/product/${data.id}`, data, {
            headers: {
                authorization: `bearer ${prevJwt}`,
                data: data,
            },
        });
    } catch (error) {
        const status = error.response.status;
        if (status === 404) throw new ApiError('404');
        throw new ApiError(error.message);
    }
};