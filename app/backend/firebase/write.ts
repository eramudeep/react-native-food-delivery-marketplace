import firestore from "@react-native-firebase/firestore";
 

export default async function writeData(collection,data) {
  let db = firestore();
  db.collection( collection)
    .add({...data,created: new Date() })
    .then(function(docRef) {
        return  { message: `Document written with ID:  ${docRef.id}`};
    })
    .catch(function(error) {
        return  { message: `Error adding document:   ${error}`};
    });
}
