import axios from "axios";
import { PRODUCT_CREATE_FAILED, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAILED, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DETAILS_FAILED, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAILED, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAILED, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../Constants/ProductConstants"


export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('/api/products');
        dispatch({
            type: PRODUCT_LIST_SUCCESS, payload: data
        });
    } catch (err) {
        dispatch({
            type: PRODUCT_LIST_FAILED, payload: err.message
        });
    }
}

export const getProductDetail = (productId) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST, payload: productId
    });
    try {
        const { data } = await axios.get(`/api/products/${productId}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, payload: data
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAILED, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const createProduct = () => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_CREATE_REQUEST
    });
    const { userSignIn: { userInfo } } = getState();
    try {
        const { data } = await axios.post('/api/products/', {}, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data.product
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAILED,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}
export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_UPDATE_REQUEST
    });
    const { userSignIn: { userInfo } } = getState();
    try {
        const { data } = await axios.put(`/api/products/${product._id}`, product, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data.product
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAILED,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const deleteProduct = (productId) => async (dispatch, getState) => {
    dispatch({
        type: PRODUCT_DELETE_REQUEST
    });
    const { userSignIn: { userInfo } } = getState();
    try {
        const { data } = await axios.delete(`/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data.message
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAILED,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

