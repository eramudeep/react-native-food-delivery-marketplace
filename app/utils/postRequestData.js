import auth from "@react-native-firebase/auth";
/**
 * @param url 
 * @description this function is creating an post request and binding the current user token with the request
 * current user`s token will be verify at API end, if token is invalid or expired it will return you an error
 */
export default async  (url,data)=>{
    const idToken =   await  auth().currentUser?.getIdToken() 
     console.log("od fom",idToken);
    
    var formdata = new FormData();
    Object.keys(data).map((item,key)=>{   
        formdata.append(item,data[item]);
    }) 
    //@ts-ignore 
    formdata.append("token", idToken);
     var requestOptions = {
      method: 'POST',
      /* headers: {
        Accept: 'application/json' 
      }, */
      body: formdata,
      redirect: 'follow'
    };
    //@ts-ignore
   return await fetch(url, requestOptions)
      /* .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));   */
}