import auth from '@react-native-firebase/auth'
import { AlertHelper } from '../../utils/AlertHelper';

export async function changePass({ currentPass, newPass }) {
    try {
        if (!auth().currentUser) return null
        const emailCred = auth.EmailAuthProvider.credential(
            auth().currentUser.email, currentPass);
        await auth().currentUser.reauthenticateWithCredential(emailCred)
            .then(async () => {
                // User successfully reauthenticated.
                console.log("user reauthenticated");
                await auth().currentUser.updatePassword(newPass)
                 AlertHelper.show("success","Success","Password changed successfull")
            })
    } catch (error) {
console.log("error==>>>",error);
if(error.code==="auth/wrong-password") AlertHelper.show("error","Error","Your current password is wrong")
    }

}