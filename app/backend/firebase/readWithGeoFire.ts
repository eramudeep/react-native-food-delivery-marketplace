 
import firestore from "@react-native-firebase/firestore";
const  geofirestore = require( 'geofirestore');


export default async function readWithGeoFire(collection) { 
    const GeoFirestore = geofirestore.initializeApp( firestore());
    const geocollection = GeoFirestore.collection(collection) 
    return geocollection
    
}
