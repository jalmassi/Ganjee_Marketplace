import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducer/productReducer';
import thunk from 'redux-thunk';
import { cartReducer } from './reducer/cartReducer';
import Cookie from 'js-cookie';
import { userRegisterReducer, userSigninReducer } from './reducer/userReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || [];

const initialState = {cart: {cartItems}, shipping: {}, payment: {}, userSignin:{userInfo}};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk))); //gives async reaction to action
export default store;