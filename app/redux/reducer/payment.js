const { SAVE_SELLER_ACCOUNT_SUCCESS, GET_SELLER_ACCOUNTS_SUCCESS, SIGN_OUT_SUCCESS } = require("../actionTypes");
const initialState = {
    sellerAcDetails: {},
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_SELLER_ACCOUNT_SUCCESS:
            return {
                ...state,
                sellerAcDetails: {...state.sellerAcDetails, ...action.payload },
            }
        case GET_SELLER_ACCOUNTS_SUCCESS:
            return {
                ...state,
                sellerAcDetails: { ...action.payload },
            }
            case SIGN_OUT_SUCCESS:
                return{
                    sellerAcDetails:{}
                }
        default:
            return { ...state }
    }
}