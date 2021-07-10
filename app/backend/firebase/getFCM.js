import messaging from '@react-native-firebase/messaging'
import auth from '@react-native-firebase/auth'
import setData from './setData'
import readDoc from './readDoc';

export  async function setFcm() {
    if (!auth().currentUser) return
    const uid = auth().currentUser.uid
    const FCM = await messaging().getToken()
   

    await setData("fcm",uid,{fcm: FCM,uid: uid})
}
export  async function getFcm(uid) {
    // if (!auth().currentUser) return
    let FCM
    await readDoc("fcm",uid).then(snap=>{
       FCM= snap.data()
    })
    return FCM?.fcm
}