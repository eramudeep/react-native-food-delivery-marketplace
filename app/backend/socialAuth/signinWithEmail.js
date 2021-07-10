import auth from '@react-native-firebase/auth';
import { AlertHelper } from '../../utils/AlertHelper';
import readDoc from '../firebase/readDoc';
import setData from '../firebase/setData';
import uploadFile from '../firebase/uploadFile';

export async function createUserWithEmail({email,password,name,mobile,image}) {
  const res=  await auth()
    .createUserWithEmailAndPassword(email,password)
    .then(async (res) => {
      console.log('User account created & signed in!');
      AlertHelper.show("success","Success","Your account created successfully")
      
      let img=''
      if(image){
          img=await uploadFile("userProfile",res.user.uid,"profileimage",image)
      }
      const userData={name,email:res.user.email,uid:res.user.uid,accountType:'',mobile,image:img}
      await readDoc("users",res.user.uid)
  .then(async user=>{
    if(!user.data()){
      await setData("users",res.user.uid,userData)
     
    }
  }).catch((err)=>{console.log("login error",err);})
  return {status:200,data:res.user}
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        AlertHelper.show("error","Error","That email address is already in use!")
        return {status:400,data:'That email address is already in use!'}
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        AlertHelper.show("error","Error","That email address is invalid!")

        return {status:400,data:'That email address is invalid!'} 
      }
  
      console.error(error);
    });   
    auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

export async function signinWithEmail({email,password}) {
    auth()
  .signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log('User signed');
  })
  .catch(error => {
      if(error.code==="auth/user-not-found") AlertHelper.show("error","Error","Invalid user/password")
      if(error.code==="auth/wrong-password") AlertHelper.show("error","Error","Invalid user/password")
      
    console.log("signin error",error.code)
    console.error(error);
  });
}