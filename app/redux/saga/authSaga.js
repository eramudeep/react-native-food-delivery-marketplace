import { put, takeLatest } from 'redux-saga/effects'
import setData from '../../backend/firebase/setData';
import auth from '@react-native-firebase/auth'
import {   CHANGE_PASSWORD, EDIT_USER, IS_SELLER_MODE, SET_ERROR, SET_USER_DATA, SIGN_OUT } from '../actionTypes';
export function* workerSetUserData(action) {
    
  if (action) {
      const {data}=action.payload
    yield put({ type: "SET_USER_DATA_SUCCESS", payload: data })
  }
}
export function* watcherSetUserData() {
  yield takeLatest(SET_USER_DATA,workerSetUserData)
}
export function* workerEditUserData(action) {
  
  if (action) {
    if(!auth().currentUser) return null
    const uid=auth().currentUser.uid
      const {data}=action.payload
      yield setData("users",uid,data)
    yield put({ type: "EDIT_USER_SUCCESS", payload: data })
  }
}
export function* watcherEditUserData() {
  yield takeLatest(EDIT_USER,workerEditUserData)
}
export function* workerGetAccountMode(action) {
   
  if (action) {
      const {accountType}=action.payload
      const uid=auth().currentUser && auth().currentUser.uid
      
        if(uid){
          yield setData("users",uid,{accountType}).catch((err=>{console.log("set error",err);}))
        }
    yield put({ type: "SET_IS_SELLER_MODE", payload: accountType })
  }
}
export function* watcherGetAccountMode() {
  yield takeLatest(IS_SELLER_MODE,workerGetAccountMode)
}
export function* workerSignOut(action) {
    auth().signOut()
    .then(()=>console.log("signout siccess"))
    yield put({ type: "SIGN_OUT_SUCCESS"})
}
export function* watcherSignOut() {
  yield takeLatest(SIGN_OUT,workerSignOut)
}

export function* workerChangePassword(action) {
if (action) {
  try {
    if(!auth().currentUser) return null
    const {currentPass,newPass}=action.payload
    const uid=auth().currentUser.uid
    const emailCred =yield auth.EmailAuthProvider.credential(
      auth().currentUser, currentPass);
      // return
    yield  auth().currentUser.reauthenticateWithCredential(emailCred)
    .then(() => {
      // User successfully reauthenticated.
      console.log("user reauthenticated");
      // return firebase.auth().currentUser.updatePassword(newPass);
    })
    .catch(error => {
      // Handle error.
      console.log("error changepass",error);
    });
  } catch (error) {
    console.log("error change pass",error);
  }
  // yield put({ type: "SET_IS_SELLER_MODE", payload: accountType })
}
}
export function* watcherChangePassword() {
yield takeLatest(CHANGE_PASSWORD,workerChangePassword)
}