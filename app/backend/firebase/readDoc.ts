 import firestore from "@react-native-firebase/firestore";

export default async function readDoc(collection, docId) {   
  let docRef = 
    firestore()
    .collection(collection)
    .doc(docId);
  let doc = {};
return  await docRef
    .get()
   /*  .then( async function(doc) {
      if (doc.exists) { 
    return   (doc = doc.data() )
      } else {
        return {
          message: `Doc not found for doc id ${docId}`,
          stateus: "Error"
        };
      }
    })
    .catch(function(error) {
      return { message: `Error getting doc id ${docId}`, stateus: error };
    }); */
  
}
