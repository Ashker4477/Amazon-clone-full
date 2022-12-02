import axios from 'axios'
import { CART_EMPTY } from '../Constants/CartConstant';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELETE_FAILED, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELIVER_FAILED, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_LIST_FAILED, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_MINE_FAIL, ORDER_MINE_REQUEST, ORDER_MINE_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../Constants/OrderConstants"


export const createdOrder = (order) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_CREATE_REQUEST,
        payload: order
    });
    try {
        const { userSignIn: { userInfo } } = getState();
        const { data } = await axios.post('/api/orders/', order, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data.order
        });
        dispatch({
            type: CART_EMPTY
        });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

export const getOrderDetail = (orderId) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_DETAIL_REQUEST,
        payload: orderId
    });
    try {
        const { userSignIn: { userInfo } } = getState();
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const payOrder = (order, paymentResult) => async (
    dispatch,
    getState
) => {
    dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
    const {
        userSignIn: { userInfo },
    } = getState();
    try {
        const { data } = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_PAY_FAIL, payload: message });
    }
};

export const listOrderMine = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_MINE_REQUEST });
    const { userSignIn: { userInfo } } = getState();
    try {
        const { data } = await axios.get(`/api/orders/mine`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ORDER_MINE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_MINE_FAIL, payload: message })
    }
}
export const getOrderList = () => async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { userSignIn: { userInfo } } = getState();
    try {
        const { data } = await axios.get(`/api/orders/`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_LIST_FAILED, payload: message })
    }
}
export const orderDelete = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELETE_REQUEST });
    const { userSignIn: { userInfo } } = getState();
    try {
        const { data } = await axios.delete(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DELETE_FAILED, payload: message })
    }
}

export const deliverOrder = (orderId) => async (dispatch, getState) => {
    dispatch({ type: ORDER_DELIVER_REQUEST });
    const { userSignIn: { userInfo } } = getState();
    try {
        const { data } = await axios.put(`/api/orders/${orderId}/deliver`,{}, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: ORDER_DELIVER_FAILED, payload: message })
    }
}