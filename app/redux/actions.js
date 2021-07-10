
import {
  ADD_ITEM,
  ADD_KITCHEN,
  ADD_TO_CART,
  CHANGE_ORDER_STATUS,
  CHANGE_PASSWORD,
  DELETE_ITEM,
  EDIT_ITEM,
  EDIT_USER,
  GET_DELIVERED_ORDERS,
  GET_ITEMS,
  GET_KITCHEN_AVAILABILITY,
  GET_KITCHEN_DETAIL,
  GET_KITCHEN_ITEM,
  GET_KITCHEN_LIST,
  GET_ORDERS,
  GET_ORDER_RECEIVED,
  GET_SELLER_ACCOUNTS,
  IS_SELLER_MODE,
  PLACE_ORDER,
  SAVE_SELLER_ACCOUNT,
  SET_ERROR,
  SET_KITCHEN_AVAILABILITY,
  SET_KITCHEN_RATING,
  SET_USER_DATA,
  SIGN_OUT
} from "./actionTypes";

export const setError = (data) => ({
  type: SET_ERROR,
  payload: data
})
export const setAccountMode = (data) => ({
  type: IS_SELLER_MODE,
  payload: data
})
export const setUserData = (data) => ({
  type: SET_USER_DATA,
  payload: data
})
export const editUserData = (data) => ({
  type: EDIT_USER,
  payload: data
})
export const signOut = () => ({
  type: SIGN_OUT,
})
export const addKitchen = (data) => ({
  type: ADD_KITCHEN,
  payload: data
})
export const getKitchenDetail = (data) => ({
  type: GET_KITCHEN_DETAIL,
  payload: data
})
export const addItem = (data) => ({
  type: ADD_ITEM,
  payload: data
})
export const getItem = (data) => ({
  type: GET_ITEMS,
  payload: data
})
export const editItem = (data) => ({
  type: EDIT_ITEM,
  payload: data
})
export const deleteItem = (data) => ({
  type: DELETE_ITEM,
  payload: data
})
export const addSellerAccount = (data) => ({
  type: SAVE_SELLER_ACCOUNT,
  payload: data
})
export const getSellerAccount = (data) => ({
  type: GET_SELLER_ACCOUNTS,
  payload: data
})
export const setKitchenAvailability = (data) => ({
  type: SET_KITCHEN_AVAILABILITY,
  payload: data
})
export const getKitchenAvailability = () => ({
  type: GET_KITCHEN_AVAILABILITY,
})
export const getKitchenList = (payload) => ({
  type: GET_KITCHEN_LIST,
  payload:payload
})
export const getKitchenItem = (data) => ({
  type: GET_KITCHEN_ITEM,
  payload: data
})
export const changePassword = (data) => ({
  type: CHANGE_PASSWORD,
  payload: data
})
export const addToCart = (data) => ({
  type: ADD_TO_CART,
  payload: data
})
export const placeOrder = (data) => ({
  type: PLACE_ORDER,
  payload: data
})
export const getOrder = () => ({
  type: GET_ORDERS,
})
export const getOrderReceived = () => ({
  type: GET_ORDER_RECEIVED,
})
export const getOrderDelivered = () => ({
  type: GET_DELIVERED_ORDERS,
})
export const setKitchenRating = (data) => ({
  type: SET_KITCHEN_RATING,
  payload:data
})
export const changeOrderStatus = (data) => ({
  type: CHANGE_ORDER_STATUS,
  payload:data
})
  /* here you can add your action */