import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import readDoc from '../firebase/readDoc';
import setData from '../firebase/setData';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/actions';
GoogleSignin.configure({
    webClientId: '888478120209-uoq7r76j28ij4md2eapa7i0quuf24m4n.apps.googleusercontent.com',
  });
export async function googleSignIn() {
  // const dispatch = useDispatch()
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  // Sign-in the user with the credential
  const res= await auth().signInWithCredential(googleCredential);

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