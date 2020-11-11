import Axios from "axios";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_PAY_REQUEST, ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST } from "../constants/orderConstants";
import { CART_EMPTY } from '../constants/cartConstants';

const createOrder = (order) => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});
    try {
        const {userSignin: {userInfo}} = getState();
        const {data: {data: newOrder }} = await Axios.post("/api/orders", order, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({type: ORDER_CREATE_SUCCESS, payload: newOrder});
        // dispatch({type: CART_EMPTY});
    } catch (error) {
        dispatch({type: ORDER_CREATE_FAIL,
            payload: error.response && error.data.message ?
                error.response.data.message : error.message});

    }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
        console.log("inside payorder action: start");
        dispatch({type: ORDER_PAY_REQUEST, payload: paymentResult});
        const { userSignin: { userInfo}} = getState();
        const { data } = await Axios.put("/api/orders/" + order._id + "/pay", paymentResult, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({type: ORDER_PAY_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ?
            error.response.data.message : error.response;
        dispatch({type: ORDER_PAY_FAIL, payload: message});
    }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId});
    try {
        const {userSignin: {userInfo}} = getState();
        const { data } = await Axios.get("/api/orders/" + orderId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token
            }
        });
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_DETAILS_FAIL, payload: error.message});

    }
}

export {createOrder, payOrder, detailsOrder};