 
import firestore from "@react-native-firebase/firestore";


export default async function readQuery(collection) { 
    return  firestore().collection(collection).get()
}
