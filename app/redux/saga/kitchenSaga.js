import {put, takeLatest} from 'redux-saga/effects';
import setData from '../../backend/firebase/setData';
import {
  ADD_ITEM,
  ADD_KITCHEN,
  CHANGE_ORDER_STATUS,
  DELETE_ITEM,
  EDIT_ITEM,
  GET_DELIVERED_ORDERS,
  GET_ITEMS,
  GET_KITCHEN_AVAILABILITY,
  GET_KITCHEN_DETAIL,
  GET_KITCHEN_LIST,
  GET_ORDER_RECEIVED,
  SET_KITCHEN_AVAILABILITY,
  SET_KITCHEN_RATING,
} from '../actionTypes';
import auth from '@react-native-firebase/auth';
import readDoc from '../../backend/firebase/readDoc';
import deleteItem from '../../backend/firebase/deleteItem';
import readQuery from '../../backend/firebase/readQuery';
import {forEach} from 'core-js/fn/array';
import uploadFile from '../../backend/firebase/uploadFile';
import firestore from '@react-native-firebase/firestore';
import readWithGeoFire from '../../backend/firebase/readWithGeoFire';
import { sortByDistance } from '../../utils/DistanceHelper';
import readDataWithConditions from '../../backend/firebase/readDataWithConditions';

// var geohash = require('ngeohash');
export function* workerAddKitchen(action) {
  const uid = auth().currentUser.uid;
  if (action) {
    const {
      kitchenName,
      contactName,
      g,
      email,
      mobile,
      address,
      img,
      cuisine,
      location,
    } = action.payload;
    const ref = `storeImages`;
    var tarea = img;
    let image;
    if (
      (tarea && tarea.indexOf('http://') == 0) ||
      (tarea && tarea.indexOf('https://') == 0)
    ) {
      // do something here
      image = tarea;
    } else {
      tarea = yield uploadFile(ref, uid, 'storeImage', img);
      image = tarea;
    }
    let allData = {
      kitchenName,
      contactName,
      g,
      email,
      mobile,
      address,
      image,
      cuisine,
      uid,
      location,
    };
    yield setData('kitchen', uid, allData);
    yield put({type: 'ADD_KITCHEN_SUCCESS', payload: allData});
  }
}
export function* watcherAddKitchen() {
  yield takeLatest(ADD_KITCHEN, workerAddKitchen);
}
export function* workerGetKitchenDetail(action) {
  if (!auth().currentUser) return null;
  const uid = auth().currentUser.uid;
  let kitchenData;
  yield readDoc('kitchen', uid).then((snap) => {
    kitchenData = snap.data();
  });
  yield put({type: 'GET_KITCHEN_DETAIL_SUCCESS', payload: kitchenData});
}
export function* watcherGetKitchenDetail() {
  yield takeLatest(GET_KITCHEN_DETAIL, workerGetKitchenDetail);
}
export function* workerAddItems(action) {
  if (!auth().currentUser) return null;
  const uid = auth().currentUser.uid;
  const {
    itemName,
    Description,
    foodType: foodTyp,
    price,
    variation: vari,
    image,
  } = action.payload;
  const orderId = Date.now();
  const img = yield uploadFile('kitchenItems', uid, image, image);
  const itemData = {
    [orderId]: {
      id: orderId,
      itemName,
      Description,
      foodType: foodTyp,
      price,
      variation: vari,
      image: img,
    },
  };
  yield setData('kitchenItems', uid, itemData);
  yield put({type: 'ADD_ITEM_SUCCESS', payload: itemData});
}
export function* watcherAddItems() {
  yield takeLatest(ADD_ITEM, workerAddItems);
}
export function* workerEditItems(action) {
  if (!auth().currentUser) return null;
  const uid = auth().currentUser.uid;
  // let kitchenData
  let {orderId, item} = action.payload;
  var tarea = item.image;

  if (
    (tarea && tarea.indexOf('http://') == 0) ||
    (tarea && tarea.indexOf('https://') == 0)
  ) {
    // do something here
    item['image'] = tarea;
  } else {
    tarea = yield uploadFile('kitchenItems', uid, item.image, item.image);
    item['image'] = tarea;
  }

  yield setData('kitchenItems', uid, {[orderId]: item});
  yield put({type: 'EDIT_ITEM_SUCCESS', payload: {[orderId]: item}});
}
export function* watcherEditItems() {
  yield takeLatest(EDIT_ITEM, workerEditItems);
}
export function* workerGetItems(action) {
  if (!auth().currentUser) return null;
  const uid = auth().currentUser.uid;
  let ItemData;
  yield readDoc('kitchenItems', uid).then((snap) => {
    ItemData = snap.data();
  });

  yield put({type: 'GET_ITEMS_SUCCESS', payload: ItemData});
}
export function* watcherGetItems() {
  yield takeLatest(GET_ITEMS, workerGetItems);
}
export function* workerDeleteItems(action) {
  if (!auth().currentUser) return null;
  const uid = auth().currentUser.uid;
  // let kitchenData
  const {orderId} = action.payload;
  yield deleteItem('kitchenItems', uid, orderId);
  yield put({type: 'DELETE_ITEM_SUCCESS', payload: {orderId}});
}
export function* watcherDeleteItems() {
  yield takeLatest(DELETE_ITEM, workerDeleteItems);
}
export function* workerSetKitchenAvailability(action) {
  if (!auth().currentUser) return null;
  const uid = auth().currentUser.uid;
  // let kitchenData
  yield setData('kitchenAvailability', uid, action.payload);
  yield setData('kitchen', uid, {kitchenAvailability: action.payload});
  yield put({
    type: 'SET_KITCHEN_AVAILABILITY_SUCCESS',
    payload: action.payload,
  });
}
export function* watcherSetKitchenAvailability() {
  yield takeLatest(SET_KITCHEN_AVAILABILITY, workerSetKitchenAvailability);
}
export function* workerGetKitchenAvailability(action) {
  if (!auth().currentUser) return null;
  const uid = auth().currentUser.uid;
  let ItemData;
  yield readDoc('kitchenAvailability', uid).then((snap) => {
    
    ItemData = snap.data();
  });

  yield put({type: 'GET_KITCHEN_AVAILABILITY_SUCCESS', payload: ItemData});
}
export function* watcherGetKitchenAvailability() {
  yield takeLatest(GET_KITCHEN_AVAILABILITY, workerGetKitchenAvailability);
}
export function* workerGetKitchenList(action) {
  let data = [];
  /**
   * NEEDED : location:{lat:123,lng:123}, 
   *        radius Must be a positive number
   * TO add Where condition, You can put it before the get function same as the firestore where
   */
  yield readQuery('kitchen').then((snapshot) => {
    snapshot.docs.map((doc) => {
      data.push({kitchenId:doc?.id,...doc.data()  /* [doc.id]: doc.data() */});
    });
  });

  const geocollection = yield readWithGeoFire('kitchen');
  let query = '';
  if (action?.payload?.location?.lat) {
    let kithchens=[]
     const {location} = action?.payload 
    query = yield geocollection.near({
      center: new firestore.GeoPoint( location.lat  ,   location.lng  ),
      radius: 50000,//MUST CHNAGE OR MAKE IT DYNAMIC
    });

    yield query.get().then((snapshot) => {
      snapshot?.docs?.map((doc) => {
        const {id,distance,data} =doc
        kithchens.push({kitchenId:id,distance:distance?.toFixed() , ...data() })
      });
    });
    kithchens.sort(sortByDistance); 
    data=[...kithchens]
  }

  yield put({type: 'GET_KITCHEN_LIST_SUCCESS', payload: data});
}
export function* watcherGetKitchenList() {
  yield takeLatest(GET_KITCHEN_LIST, workerGetKitchenList);
}
export function* workerGetKitchenItems(action) {
  const {kitchenUid} = action.payload;
  let ItemData;
  yield readDoc('kitchenItems', kitchenUid).then((snap) => {
    ItemData = snap.data();
  });
  yield put({type: 'GET_ITEMS_SUCCESS', payload: ItemData});
}
export function* watcherGetKitchenItems() {
  yield takeLatest(GET_ITEMS, workerGetKitchenItems);
}
export function* workerSetKitchenRating(action) {
  if (!auth().currentUser) return null;
  const uid = auth().currentUser.uid;
  // let kitchenData
  //
  const {kitchenId, rating} = action.payload;
  yield setData('kitchen', kitchenId, {
    ratings: firestore.FieldValue.arrayUnion(rating),
  });
  // yield put({ type: "SET_KITCHEN_RATING_SUCCESS", payload: action.payload })
}
export function* watcherSetKitchenRating() {
  yield takeLatest(SET_KITCHEN_RATING, workerSetKitchenRating);
}

export function* workerGetOrdersReceived() {
  if (!auth().currentUser) return null
  const uid = auth().currentUser.uid
  let order=[]
  const readRef= yield readDataWithConditions('orders', [
    {field: 'sellerUid', oprator: '==', fieldValue: uid},
    {field: 'status', oprator: '!=', fieldValue: "DELIVERED"},
 ]) ;
  yield readRef.get()
    .then(snap => {
      snap.forEach(val=>{
        order.push({...val.data(),uid:val.id})
      })
    })
    // const uid=auth().currentUser.uid
    //   const {items,price,kitchen}=action.payload
    //   const orderId = Date.now()
    //   const order={[orderId]:{orderOn: new Date(),id:orderId,items,price,kitchen,status:"current"}}
    //   yield setData('orders',uid,order)
    // console.log("all orders",order);
    yield put({ type: "GET_ORDER_RECEIVED_SUCCESS", payload: order})
  
}
export function* watcherGetOrderReceived() {
  yield takeLatest(GET_ORDER_RECEIVED,workerGetOrdersReceived)
}
export function* workerGetOrdersDelivered() {
  if (!auth().currentUser) return null
  const uid = auth().currentUser.uid
  let order=[]
  const readRef= yield readDataWithConditions('orders', [
    {field: 'sellerUid', oprator: '==', fieldValue: uid},
    {field: 'status', oprator: '==', fieldValue: "DELIVERED"},
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
    // console.log("all orders",order);
    yield put({ type: "GET_DELIVERED_ORDERS_SUCCESS", payload: order})
  
}
export function* watcherGetOrderDelivered() {
  yield takeLatest(GET_DELIVERED_ORDERS,workerGetOrdersDelivered)
}
export function* workerChangeOrderStatus(action) {
  if (!auth().currentUser) return null;
  const uid = auth().currentUser.uid;
  // let kitchenData
  const{status}=action.payload
  console.log("chang order stat",action.payload);
  yield setData('orders',status.docId, {status:status.status});
  yield put({
    type: 'GET_ORDER_RECEIVED',
  });
}
export function* watcherChangeOrderStatus() {
  yield takeLatest(CHANGE_ORDER_STATUS, workerChangeOrderStatus);
}