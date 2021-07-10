import React, { useEffect, useState } from 'react'
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { useDispatch, useSelector } from 'react-redux'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import InputField from '../../../components/CustomInput/InputField'
import Header from '../../../components/Header'
import ICStore from '../../../components/SVG/ICStore'
import ICUpload from '../../../components/SVG/ICUpload'
import { addKitchen } from '../../../redux/actions'
import { AlertHelper } from '../../../utils/AlertHelper'
import { appColors } from '../../../utils/appColors'
import * as ImagePicker from 'react-native-image-picker'
import { foodType } from '../../../utils/MockData'
import RNPickerSelect from 'react-native-picker-select';
import PlacesAutocomplete from '../../../components/MapView/PlacesAutocomplete'
import geohash from '../../../utils/geohash'
import firestore from '@react-native-firebase/firestore'
var regExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
export default function CreateKitchen({ navigation }) {
    const { kitchenDetail } = useSelector(state => state.kitchen)
    const { userData } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [kitchenName, setKitchenName] = useState()
    const [contactName, setContactName] = useState()
    const [email, setEmail] = useState()
    const [mobile, setMobile] = useState()
    const [address, setAddress] = useState()
    const [location, setLocation] = useState()
    const [image, setImage] = useState()
    const [foodTyp, setFoodType] = useState()
console.log(location);
    const emptyChecker = () => {
        if (!kitchenName) return "Kitchen Name"
        if (!contactName) return "Contact Name"
        if (!email) return "Email"  
        if (!mobile) return "Mobile"
        if (!location) return "Address"
        if (!image) return "Kitchen Image"
        if (!foodTyp) return "Kitchen cuisine"
    }
    const onSave = async () => {
        const isEmpty = emptyChecker()
        if (isEmpty) return AlertHelper.show("error", "Error", `${isEmpty} is required`)
        
        if (!mobile.match(regExp)) return AlertHelper.show("error", "Error", "Please enter valid phone number")
        const geoHash = geohash.encode(location.latitude,location.longitude)   
        // console.log(geoHash);
        const g={geohash:geoHash,geopoint:new firestore.GeoPoint(location.latitude,location.longitude)}
        dispatch(addKitchen({ kitchenName,g, contactName, email, mobile, address,location,img:image,cuisine:foodTyp }))
        AlertHelper.show("success","Success","Your details are saved successfully")
    }
    const onUpload = async () => {
        await ImagePicker.launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 500,
                maxWidth: 500,
                quality:0.5
              },
              async(response) => {
                setImage(response.uri)
              // const ref='storeImages/'
            //    const resp=await uploadFile(ref,"789456123",response.uri)
                return response
              },
            )
    }
    useEffect(() => {
        if (kitchenDetail) {
            if (kitchenDetail.kitchenName) setKitchenName(kitchenDetail.kitchenName)
            if (kitchenDetail.contactName) setContactName(kitchenDetail.contactName)
            if (userData.email) setEmail(userData.email)
            if (kitchenDetail.mobile) setMobile(kitchenDetail.mobile)
            if (kitchenDetail.address) setAddress(kitchenDetail.address)
            if (kitchenDetail.image) setImage(kitchenDetail.image)
            if (kitchenDetail.image) setFoodType(kitchenDetail.cuisine)
            if (kitchenDetail.location) setLocation(kitchenDetail.location)
        }
    }, [kitchenDetail])
    return (
        
        <NormalContainer scrollable header={<Header showBack titleColor={appColors.thirdColor} title={"Kitchen Details"} onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} />}>
            {/* <Text style={styles.title}>Kitchen Details</Text> */}
            <View style={{ paddingHorizontal: scale(20)}}>
                <ImageBackground source={{ uri: image }} style={[styles.imgView, styles.center]}>
                    <ICStore size={scale(30)} />
                    <TouchableRipple onPress={onUpload} rippleDuration={800} rippleColor={appColors.white} style={{ position: "absolute", bottom: 5, right: 5 }}>
                        <ICUpload size={scale(35)} />
                    </TouchableRipple>
                </ImageBackground>
            </View>
            <InputField placeholder={"Kitchen Name"} value={kitchenName} onChangeText={(val) => setKitchenName(val)} />
            <InputField  placeholder={"Contact Name"} value={contactName} onChangeText={(val) => setContactName(val)} />
            <InputField disable placeholder={"Email"} keyboardType={"email-address"} value={email} onChangeText={(val) => setEmail(val)} />
            <InputField maxLength={11} keyboardType="phone-pad" placeholder={"Mobile Number"} value={mobile} onChangeText={(val) => setMobile(val)} />
            {/* <InputField placeholder={"Address"} value={address} onChangeText={(val) => setAddress(val)} /> */}
            
            <PlacesAutocomplete placeholder={"Address"}  value={address} onChangeText={(val) => setAddress(val) } onPress={(data,details=null)=>{setAddress(details.formatted_address);setLocation({latitude:details.geometry.location.lat,longitude:details.geometry.location.lng})}}/>
             
            <View style={styles.pickerView}>
                                        <RNPickerSelect
                                            pickerProps={{
                                                mode: "dropdown",

                                            }}
                                            onValueChange={(value) => setFoodType(value)}
                                            items={foodType}
                                            placeholder={{label:"Kitchen cuisine",value:null}}
                                            value={foodTyp}
                                            useNativeAndroidPickerStyle={false}
                                            style={pickerSelectStyles}
                                        />
                                    </View>
            {/* <View style={styles.uploadView}>
                                        <Text style={styles.uploadTxt}>Upload Image</Text>
                                        <TouchableRipple rippleDuration={800} rippleColor={appColors.white} style={styles.addBtn} >
                                            <ICUpload size={scale(30)} />
                                        </TouchableRipple>
                                    </View> */}
            <CustomButton label={"Save"} onPress={onSave} />
        </NormalContainer>
    )
}

const styles = StyleSheet.create({
    title: {
        color: appColors.thirdColor,
        textAlign: "center",
        fontSize: scale(20),
        fontFamily: "JosefinSans-SemiBold",
        marginVertical: scale(20)
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    imgView: {
        height: scale(120),
        // width:scale(120),
        backgroundColor: appColors.black22,
        borderRadius: scale(5),
        overflow: "hidden"
    },
    addBtn: {
        height: scale(30),
        width: scale(30),
        borderRadius: scale(30 / 2),
        overflow: "hidden",
    },
    uploadTxt: {
        color: appColors.forthColor,
        fontSize: scale(14),
        fontFamily: "JosefinSans-SemiBold",
        marginRight: scale(10),
    },
    uploadView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: scale(20),
        marginTop: scale(10),
        alignItems: "center"
    },
    pickerView: {
        height: scale(45),
        //   backgroundColor: "red",
        //    width: scale(100) ,
        flex: 1,
        borderWidth: scale(1),
        borderColor: appColors.black22,
        borderRadius: scale(10),
        marginHorizontal: scale(20),
        marginTop: scale(20)
    },
})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: scale(16),
        paddingHorizontal: scale(40),
        color: appColors.forthColor,
        fontFamily: "JosefinSans-Regular",
        // flex:1
    },
    inputAndroid: {
        fontSize: scale(16),
        paddingHorizontal: scale(40),
        color: appColors.forthColor,
        fontFamily: "JosefinSans-Regular",
        // flex:1
    },
});