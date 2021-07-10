import {  all } from "redux-saga/effects"
import { watcherChangePassword, watcherEditUserData, watcherGetAccountMode, watcherSetUserData, watcherSignOut } from "./saga/authSaga"
import { watcherAddToCart, watcherGetOrder, watcherPlaceOrder } from "./saga/cartSaga"
import { workerGetError } from "./saga/errorSaga"
import { watcherAddItems, watcherAddKitchen, watcherChangeOrderStatus, watcherDeleteItems, watcherEditItems, watcherGetItems, watcherGetKitchenAvailability, watcherGetKitchenDetail, watcherGetKitchenList, watcherGetOrderDelivered, watcherGetOrderReceived, watcherSetKitchenAvailability, watcherSetKitchenRating,} from "./saga/kitchenSaga"
import { watcherGetSellerAccounts, watcherSetSellerAccounts } from "./saga/paymentSaga"

//single entry point to start all sagas
export default function* rootSaga() {
  yield all([
    workerGetError(),
    watcherGetAccountMode(),
    watcherSetUserData(),
    watcherSignOut(),
    watcherAddKitchen(),
    watcherGetKitchenDetail(),
    watcherAddItems(),
    watcherEditItems(),
    watcherGetItems(),
    watcherDeleteItems(),
    watcherSetSellerAccounts(),
    watcherEditUserData(),
    watcherGetSellerAccounts(),
    watcherSetKitchenAvailability(),
    watcherGetKitchenAvailability(),
    watcherGetKitchenList(),
    watcherChangePassword(),
    watcherAddToCart(),
    watcherPlaceOrder(),
    watcherSetKitchenRating(),
    watcherGetOrder(),
    watcherGetOrderReceived(),
    watcherGetOrderDelivered(),
    watcherChangeOrderStatus()
  ])
}
