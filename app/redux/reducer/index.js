import { combineReducers } from "redux"
import error from './error'
import auth from './auth'
import kitchen from './kitchen'
import payment from './payment'
import cart from './cart'
export default combineReducers({
error,
auth,
kitchen,
payment,
cart
})