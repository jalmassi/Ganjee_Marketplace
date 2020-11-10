import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducer/productReducer';
import thunk from 'redux-thunk';
import { cartReducer } from './reducer/cartReducer';
import Cookie from 'js-cookie';
import { userRegisterReducer, userSigninReducer } from './reducer/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducer/orderReducer';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || [];

const initialState = {
    cart: {
        cartItems: cartItems,
        shipping: localStorage.getItem('shipping') ?
            JSON.parse(localStorage.getItem('shipping')) : {},
        payment: localStorage.getItem('payment') ?
            JSON.parse(localStorage.getItem('payment')) : 'PayPal'
    },
    userSignin:{userInfo}};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderPay: orderPayReducer,
    orderDetails: orderDetailsReducer,
    orderCreate: orderCreateReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk))); //gives async reaction to action
export default store;