const { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } = require("../constants/orderConstants");


function createOrderReducer(state= {product:{} }, action){

    switch(action.type) {
        case ORDER_CREATE_REQUEST:
            return {loading: true};
        case ORDER_CREATE_SUCCESS:
            return {loading: false};
        case ORDER_CREATE_FAIL:
            return {loading: false};
        default:
            return state;
    }
}

export {createOrderReducer}