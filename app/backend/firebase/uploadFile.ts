import storage from "@react-native-firebase/storage";

export default async function uploadFile(ref:string,uid:string,fileName:string,file:any) {   
  if(!file) return
  const reference = storage().ref(`${ref}/${uid}/${fileName}`);
   await reference.putFile(file).catch(err=>{console.log("error upload",err);
   })
  return await storage()
  .ref(`${ref}/${uid}/${fileName}`)
  .getDownloadURL().catch(err=>{console.log("download eror",err);
  });
}