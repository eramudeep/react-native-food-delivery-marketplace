 import firestore from "@react-native-firebase/firestore";


export default async function setData(collection:string,docId:string,data:any) { 
  let db =  firestore(); 
  //state:"ACTIVE"
  return await db.collection(collection).doc(docId).set({...data },{merge:true}) 
 // return db.collection(collection).document(docId).setData({...data}) 
//  ,created: new Date()
}

