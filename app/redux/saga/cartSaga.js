import { put, takeLatest } from 'redux-saga/effects'
import setData from '../../backend/firebase/setData';
import {  ADD_TO_CART, GET_ORDERS, PLACE_ORDER, SET_ERROR } from '../actionTypes';
import auth from '@react-native-firebase/auth'
import readDoc from '../../backend/firebase/readDoc';
import redData from '../../backend/firebase/read';
import readDataWithConditions from '../../backend/firebase/readDataWithConditions';
export function* workerAddToCart(action) {
  if (action) {
      const {cartRes,kitchen}=action.payload
    yield put({ type: "ADD_TO_CART_SUCCESS", payload: {cartRes,kitchen} })
  }
}
export function* watcherAddToCart() {
  yield takeLatest(ADD_TO_CART,workerAddToCart)
}
export function* workerPlaceOrder(action) {
  if (action) {
    const uid=auth().currentUser.uid
      const {items,price,kitchen}=action.payload
      let orderId = Date.now()
      orderId=orderId
      const order={orderOn: new Date(),id:orderId,orderNumber:orderId,items,price,kitchen,status:"PENDING",sellerUid:kitchen.uid,buyerUid:uid}
      yield setData('orders',"",order)
    yield put({ type: "PLACE_ORDER_SUCCESS", payload: order})
  }
}
export function* watcherPlaceOrder() {
  yield takeLatest(PLACE_ORDER,workerPlaceOrder)
}
export function* workerGetOrders(action) {
  if (!auth().currentUser) return null
  const uid = auth().currentUser.uid
  let order=[]
  const readRef= yield readDataWithConditions('orders', [
    {field: 'buyerUid', oprator: '==', fieldValue: uid},  
    {field: 'status', oprator: '!=', fieldValue: "DELIVERED"},  
 ]) ;
  yield readRef.get()
    .then(snap => {
      snap.forEach(val=>{
        order.push(val.data())
      })
    })
    // const uid=auth().currentUser.uid
    //   const {items,price,kitchen}=action.payload
    //   const orderId = Date.now()
    //   const order={[orderId]:{orderOn: new Date(),id:orderId,items,price,kitchen,status:"current"}}
    //   yield setData('orders',uid,order)
    console.log("all orders",order);
    yield put({ type: "GET_ORDERS_SUCCESS", payload: order})
  
}
export function* watcherGetOrder() {
  yield takeLatest(GET_ORDERS,workerGetOrders)
}