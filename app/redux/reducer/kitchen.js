const { SET_ERROR_SUCCESS, ADD_KITCHEN_SUCCESS, SIGN_OUT_SUCCESS, GET_KITCHEN_DETAIL_SUCCESS, ADD_ITEM_SUCCESS, EDIT_ITEM_SUCCESS, GET_ITEMS_SUCCESS, DELETE_ITEM_SUCCESS, SET_KITCHEN_AVAILABILITY_SUCCESS, GET_KITCHEN_AVAILABILITY_SUCCESS, GET_KITCHEN_LIST_SUCCESS, GET_ORDER_RECEIVED_SUCCESS, GET_DELIVERED_ORDERS_SUCCESS } = require("../actionTypes");
const initialState = {
    kitchenDetail: {},
    kitchenItems: {},
    kitchenAvail: {},
    kitchenList: [],
    receivedOrders:[],
    deliveredOrders:[]
}
export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_KITCHEN_SUCCESS:
            return {
                ...state,
                kitchenDetail: {...state.kitchenDetail, ...action.payload },
            }
        case GET_KITCHEN_DETAIL_SUCCESS:
            return {
                ...state,
                kitchenDetail: { ...action.payload }
            }
        case ADD_ITEM_SUCCESS:
            return {
                ...state,
                kitchenItems: { ...state.kitchenItems, ...action.payload }
            }
        case EDIT_ITEM_SUCCESS:
            return {
                ...state,
                kitchenItems: { ...state.kitchenItems, ...action.payload }
            }
        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                kitchenItems: action.payload
            }
        case DELETE_ITEM_SUCCESS:
            const { orderId } = action.payload
            let items = state.kitchenItems
            delete items[orderId]
            return {
                ...state,
                kitchenItems: items
            }
        case SET_KITCHEN_AVAILABILITY_SUCCESS:
            return {
                ...state,
                kitchenAvail: { ...action.payload }
            }
        case GET_KITCHEN_AVAILABILITY_SUCCESS:
            return {
                ...state,
                kitchenAvail: { ...action.payload }
            }
        case GET_KITCHEN_LIST_SUCCESS:
            return {
                ...state,
                kitchenList: [...action.payload]
            }
        case SIGN_OUT_SUCCESS:
            return {
                kitchenDetail: {},
                kitchenItems: {},
                kitchenAvail: {},
                kitchenList: []
            }
            case GET_ORDER_RECEIVED_SUCCESS:
            return {
                ...state,
                receivedOrders: action.payload,
            }
            case GET_DELIVERED_ORDERS_SUCCESS:
            return {
                ...state,
                deliveredOrders: action.payload,
            }
        default:
            return { ...state }
    }
}