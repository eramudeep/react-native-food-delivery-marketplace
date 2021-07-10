import auth from '@react-native-firebase/auth'
import { AlertHelper } from '../../utils/AlertHelper';
import setData from '../firebase/setData';

export async function inactiveAccount({ currentPass}) {
    let status = false
    try {
        if (!auth().currentUser) return null
        const emailCred = auth.EmailAuthProvider.credential(
            auth().currentUser.email, currentPass);
        await auth().currentUser.reauthenticateWithCredential(emailCred)
            .then(async () => {
                // User successfully reauthenticated.
                console.log("user reauthenticated");
                await setData('users',auth().currentUser.uid,{state:"INACTIVE"})
                status = true
            })
    } catch (error) {
        console.log("error==>>>", error);
        if (error.code === "auth/wrong-password") AlertHelper.show("error", "Error", "Your current password is wrong")
    }
  return  status
}