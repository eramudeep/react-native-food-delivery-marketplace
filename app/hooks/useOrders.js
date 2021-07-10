import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
/**
 *
 * @param {*} param0
 * @returns
 * @description callBack will be used to call the redux action, so will be notified that something is changed in the order collection
 * releaed to the login user,
 * Dispatch redux action and fetch the order from order collection
 */
export default function useOrders({userId, callBack}) {
  const [ordersList, setOrdersList] = useState([]);
  useEffect(() => {
    readData();
    //not remving the listner
  }, [userId]);

  const readData = async () => {
     firestore()
      .collection('orders')
      .where('buyerUid', '==', userId ? userId : 'AVOID_ERROR')
      .orderBy('orderOn', 'desc')
      .onSnapshot(onReadSuccess);
  };
  const onReadSuccess = (querySnapshot) => {
      console.log("querySnapshot",querySnapshot);
    let tmpOrders = [];
    /* querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
      tmpOrders.push({orderId: doc.id, ...doc.data()});
    });
    setOrdersList(tmpOrders); */
    let chnagedHappned = false;
    querySnapshot?.docChanges().forEach((change) => {
      if (change.type === 'added' || change.type === 'modified') {
        chnagedHappned = true;
      }
    });
    if (chnagedHappned) {
      callBack && callBack();
    }
  };
  return ordersList;
}
