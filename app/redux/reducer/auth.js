const { SET_USER_DATA_SUCCESS, SET_IS_SELLER_MODE, SIGN_OUT_SUCCESS, EDIT_USER_SUCCESS } = require("../actionTypes");
const initialState = {
    userData: {},
    accountType: '',
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA_SUCCESS:
            return {
                ...state,
                userData: { ...state.userData, ...action.payload },
            }
            case EDIT_USER_SUCCESS:
            return {
                ...state,
                userData: { ...state.userData, ...action.payload },
            }
        case SET_IS_SELLER_MODE:
            return {
                ...state,
                accountType: action.payload,
            }
        case SIGN_OUT_SUCCESS:
            return {
                userData: {},
                accountType: '',
            }
        default:
            return { ...state }
    }
}
