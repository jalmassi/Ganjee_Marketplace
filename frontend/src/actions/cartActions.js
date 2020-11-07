import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_PLACEORDER, CART_SAVE_SHIPPING } from "../constants/cartConstants";
import Cookie from 'js-cookie';

const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        qty = parseInt(qty);
        const {data} = await Axios.get("/api/products/" + productId);
        dispatch({type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    });
    updateCookie(getState);
    } catch (error) {

    }
}
const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});
    updateCookie(getState);
}

function updateCookie(getState){
    const {cart:{cartItems}} = getState(); //add to cookie
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) =>{
    dispatch({type: CART_SAVE_SHIPPING, payload: data});
    localStorage.setItem('shipping', JSON.stringify(data));
}

const savePayment = (data) => (dispatch) =>{
    dispatch({type: CART_SAVE_PAYMENT, payload: data});
    localStorage.setItem('payment', JSON.stringify(data));
}

const savePlaceOrder = (data) => (dispatch) =>{
    dispatch({type: CART_SAVE_PLACEORDER, payload: data});
    localStorage.setItem('placeOrder', JSON.stringify(data));
}


export {addToCart, removeFromCart, updateCookie, saveShipping, savePayment, savePlaceOrder}