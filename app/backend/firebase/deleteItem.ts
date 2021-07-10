import firestore from "@react-native-firebase/firestore";


export default async function deleteItem(collection:string,docId:string,data:any) { 
  let db =  firestore(); 
  //state:"ACTIVE"
  return await db.collection(collection).doc(docId).update({[data]:firestore.FieldValue.delete()}) 
 // return db.collection(collection).document(docId).setData({...data}) 

}

