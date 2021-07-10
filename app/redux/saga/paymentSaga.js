import { put, takeLatest } from 'redux-saga/effects'
import setData from '../../backend/firebase/setData';
import auth from '@react-native-firebase/auth'

import {  GET_SELLER_ACCOUNTS, SAVE_SELLER_ACCOUNT, SET_ERROR } from '../actionTypes';
import readDoc from '../../backend/firebase/readDoc';
export function* workerSetSellerAccounts(action) {
  if (action) {
    if(!auth().currentUser) return null
    const uid=auth().currentUser.uid
    //   const {error}=action.payload
      yield setData("sellerPaymentDetails",uid,action.payload)
      yield setData('kitchen', uid, {accountId:action.payload.account.id})
    yield put({ type: "ADD_KITCHEN_SUCCESS", payload: {accountId:action.payload.account.id} })
    yield put({ type: "SAVE_SELLER_ACCOUNT_SUCCESS", payload: action.payload })
  }
}
export function* watcherSetSellerAccounts() {
  yield takeLatest(SAVE_SELLER_ACCOUNT,workerSetSellerAccounts)
}
export function* workerGetSellerAccounts() {
  
    if(!auth().currentUser) return null
    const uid=auth().currentUser.uid
    let data
      yield readDoc("sellerPaymentDetails",uid)
      .then(snap=>{
        data=snap.data()
      })
    yield put({ type: "GET_SELLER_ACCOUNTS_SUCCESS", payload: data })
  
}
export function* watcherGetSellerAccounts() {
  yield takeLatest(GET_SELLER_ACCOUNTS,workerGetSellerAccounts)
}