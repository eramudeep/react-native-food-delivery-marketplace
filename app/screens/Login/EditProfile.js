import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import NormalContainer from '../../components/Container/NormalContainer'
import CustomButton from '../../components/CustomButton'
import InputField from '../../components/CustomInput/InputField'
import Header from '../../components/Header'
import PlacesInput from '../../components/MapView/CustomPlacesAutocomplete'
import PlacesAutocomplete from '../../components/MapView/PlacesAutocomplete'
import { editUserData } from '../../redux/actions'
import { AlertHelper } from '../../utils/AlertHelper'
import { appColors } from '../../utils/appColors'

export default function EditProfile({navigation}) {
    const {userData} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [name, setName] = useState(userData.name)
    const [email, setEmail] = useState(userData.email)
    const [mobile, setMobile] = useState(userData.mobile||"")
    const [address, setAddress] = useState(userData.address||"")
    const [location, setLocation] = useState(userData.location||"")
console.log(address);
    const checkIfEmpty=()=>{
        if(!name) return "Name"
        if(!mobile) return "Mobile"
        if(!location) return "Address"
    }
    useEffect(() => {
        if(userData){
            if(userData.name)setName(userData.name)
            if(userData.email)setEmail(userData.email)
            if(userData.mobile)setMobile(userData.mobile)
            if(userData.address)setAddress(userData.address)
            if(userData.location)setLocation(userData.location)
        }
    }, [userData])
const onSave=()=>{
    const isEmpty=checkIfEmpty() 
    if(isEmpty) return AlertHelper.show("error","Error",`${isEmpty} is required`)
        dispatch(editUserData({data:{name,mobile,address,location}}))
        AlertHelper.show("success","Success","Edit account successfully")
}
    return (
        <NormalContainer scrollable  header={<Header showBack onBack={()=>navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor}/>}>
            <Text style={styles.title}>Edit Account</Text>
            <InputField placeholder={"Name"} value={name} onChangeText={(val)=>setName(val)}/>
            {/* <InputField placeholder={"Kitchen Name"}/> */}
            <InputField disable  placeholder={"mail@mail.com"} value={email}/>
            <InputField placeholder={"Mobile Number"} value={mobile} onChangeText={(val)=>setMobile(val)}/>
            {/* <InputField placeholder={"Address"} value={address} onChangeText={(val)=>setAddress(val)}/> */}
            {/* <View style={{height:scale(50)}}> */}
            <PlacesAutocomplete placeholder={"Address"}  value={address} onChangeText={(val) => setAddress(val) } onPress={(data,details=null)=>{setAddress(details.formatted_address);setLocation({latitude:details.geometry.location.lat,longitude:details.geometry.location.lng})}}/>
            {/* <PlacesInput  googleApiKey="AIzaSyAefnV7MLP6LDSWiItD5-Axfdpiowy2Ug0"/> */}
            {/* </View> */}
            <CustomButton label={"Save"} onPress={onSave}/>
        </NormalContainer>
    )
}

const styles = StyleSheet.create({
    title:{
        color:appColors.thirdColor,
        textAlign:"center",
        fontSize:scale(20),
        fontFamily:"JosefinSans-SemiBold",
        marginVertical:scale(20)
    }
})
