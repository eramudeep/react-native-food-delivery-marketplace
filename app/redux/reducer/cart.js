const { SET_ERROR_SUCCESS, ADD_TO_CART_SUCCESS, PLACE_ORDER_SUCCESS, GET_ORDERS_SUCCESS } = require("../actionTypes");
const initialState = {
    cart: [],
    orders: [],
    cartKitchen:{}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                cart: action.payload.cartRes,
                cartKitchen:action.payload.kitchen
            }
        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                cart: [],
                orders:[...state.orders,action.payload],
                cartKitchen:{}
            }
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
            }
        default:
            return { ...state }
    }
}