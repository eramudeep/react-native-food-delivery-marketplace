import auth from '@react-native-firebase/auth'
import { AlertHelper } from '../../utils/AlertHelper';

export async function forgotPass(email) {
    auth().sendPasswordResetEmail(email)
    .then(function (user) {
      AlertHelper.show("info","Info","Please ckeck your email and change your password")
    }).catch(function (e) {
      console.log(e)
      if(e.code==="auth/user-not-found") AlertHelper.show("error","Error","This user does not exist or may have been deleted.")
    })
}