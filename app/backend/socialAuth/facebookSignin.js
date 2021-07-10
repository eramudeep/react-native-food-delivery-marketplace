import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import readDoc from '../firebase/readDoc';
import setData from '../firebase/setData';

export async function facebookSignin() { 
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  const res=await auth().signInWithCredential(facebookCredential);
 
  const userData={name:res.user.displayName,email:res.user.email,uid:res.user.uid,accountType:''}
  await readDoc("users",res.user.uid)
  .then(async user=>{
    if(!user.data()){
      await setData("users",res.user.uid,userData)
      // dispatch(setUserData({data:userData}))
    }
    else{
      // dispatch(setUserData({data:user.data()}))
    }
    
    
  }).catch((err)=>{console.log("login error",err);})
  return res.user
}