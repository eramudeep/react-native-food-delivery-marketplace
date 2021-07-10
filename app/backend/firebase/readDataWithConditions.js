import firestore from '@react-native-firebase/firestore'


export default async function readDataWithConditions(collection,  ...condition) { 

    let query =   firestore().collection(collection)/* where("role", "==", "SELLER") . */
    if(condition.length > 0){
         condition.map(condi=>{  
             
             condi?.map(wher=>{ 
                 query = query.where(wher.field,wher.oprator,wher.fieldValue )  
             })
             //query = query.where(condi[0].field,condi[0].oprator,condi[0].fieldValue )  
             
        }) 
    }
     return query  
 }