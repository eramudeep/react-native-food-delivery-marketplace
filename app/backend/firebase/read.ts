import firestore from "@react-native-firebase/firestore";
  

export default async function redData(collection, ...condition) { 
    let db = firestore();
    let query =  db.collection(collection);
   if(condition.length > 0){
       condition.map(condi=>{  
          query.where(condi[0].field,condi[0].oprator,condi[0].fieldValue )  
       }) 
   }  
    return query.get()/* .then(snapshot=>{    
    snapshot.docs.map(doc=>{
    
     sellers.push(doc.data())
    })
 })  */
}
