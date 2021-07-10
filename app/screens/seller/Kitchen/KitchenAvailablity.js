import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Switch } from 'react-native'
import { scale } from 'react-native-size-matters'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import CustomCheck from '../../../components/CustomCheck'
import Header from '../../../components/Header'
import { appColors } from '../../../utils/appColors'
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux'
import { setKitchenAvailability } from '../../../redux/actions'
import { AlertHelper } from '../../../utils/AlertHelper'
import CustomInput from '../../../components/CustomInput'
import InputField from '../../../components/CustomInput/InputField'
const pickerData = [
    /* { label: '08:00', value: '08:00' },
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
    { label: '13:00', value: '13:00' },
    { label: '14:00', value: '14:00' },
    { label: '15:00', value: '15:00' },
    { label: '16:00', value: '16:00' },
    { label: '17:00', value: '17:00' },
    { label: '18:00', value: '18:00' },
    { label: '19:00', value: '19:00' },
    { label: '20:00', value: '20:00' },
    { label: '21:00', value: '21:00' },
    { label: '22:00', value: '22:00' },
    { label: '23:00', value: '23:00' },
    { label: '24:00', value: '24:00' },
    { label: '01:00', value: '01:00' },
    { label: '02:00', value: '02:00' },
    { label: '03:00', value: '03:00' },
    { label: '04:00', value: '04:00' },
    { label: '05:00', value: '05:00' },
    { label: '06:00', value: '06:00' },
    { label: '07:00', value: '07:00' }, */

    { label: '08:00', value: 8 },
    { label: '09:00', value: 9 },
    { label: '10:00', value: 10 },
    { label: '11:00', value: 11 },
    { label: '12:00', value: 12 },
    { label: '13:00', value: 13 },
    { label: '14:00', value: 14 },
    { label: '15:00', value: 15 },
    { label: '16:00', value: 16 },
    { label: '17:00', value: 17 },
    { label: '18:00', value: 18 },
    { label: '19:00', value: 19 },
    { label: '20:00', value: 20 },
    { label: '21:00', value: 21 },
    { label: '22:00', value: 22 },
    { label: '23:00', value: 23 },
    { label: '24:00', value: 24 },
    { label: '01:00', value: 1 },
    { label: '02:00', value: 2 },
    { label: '03:00', value: 3 },
    { label: '04:00', value: 4 },
    { label: '05:00', value: 5 },
    { label: '06:00', value: 6 },
    { label: '07:00', value: 7 },
    
]
const available=[
    {
        day:"Sunday",
        open:9,
        close:19,
        enable:false
    },
    {
        day:"Monday",
        open:9,
        close:19,
        enable:false
    },
    {
        day:"Tuesday",
        open:9,
        close:19,
        enable:false
    },
    {
        day:"Wednesday",
        open:9,
        close:19,
        enable:false
    },
    {
        day:"Thursday",
        open:9,
        close:19,
        enable:false
    },
    {
        day:"Friday",
        open:9,
        close:19,
        enable:false
    },
    {
        day:"Saturday",
        open:9,
        close:19,
        enable:false
    },
    
]
const days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
export default function KitchenAvailablity({ navigation }) {
    const dispatch = useDispatch()
    const {kitchenDetail} = useSelector(state => state.kitchen) 
    const [isEnabled, setIsEnabled] = useState(false);
    const [delivery, setDelivery] = useState(false)
    const [pickup, setPickup] = useState(false)
    const [hasErrorInTiming, setHasErrorInTiming] = useState(null)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [kitchenAvailable, setKitchenAvailable] = useState(available)
    const [feePerMile, setFeePerMile] = useState()
    const placeholder = {
        label: pickerData[0].label,
        value: null,
        color: '#9EA0A4',
    };
    const addAvailability = (day,open,close) => {
       console.log("======day===",day,"open",open,"===close==",close);
       setHasErrorInTiming(null)
        let kitch=kitchenAvailable
        //console.log(">>>>>>>",kitch[0]);
        if(day){
            for(var i in kitch){
                if(kitch[i].day===day){
                   let enable= kitch[i].enable
                   kitch[i].enable=!enable
                }
            }
            setKitchenAvailable([...kitch])
        }
        if(open){
            for(var i in kitch){
                if(kitch[i].day===open.data){
                   kitch[i].open=open.value
                   if(open.value <= kitch[i]?.close  ){
                    setHasErrorInTiming( kitch[i])
                    AlertHelper.show("error","Oops!",`${kitch[i].day} Open time must be grater then ${kitch[i]?.open}`)
                }
                }
            }
            setKitchenAvailable([...kitch])
        }
        if(close){
            console.log(close.value);
            for(var i in kitch){
                if(kitch[i].day===close.data){ 
                    kitch[i].close=close.value
                    if(close.value <= kitch[i]?.open  ){
                        setHasErrorInTiming( kitch[i])
                        AlertHelper.show("error","Oops!",`${kitch[i].day} Open time must be grater then ${kitch[i]?.open}`)
                    }
                }
            }
            setKitchenAvailable([...kitch])
        }
    }
    const onSave=()=>{
        if(!delivery && !pickup) return AlertHelper.show("error","Error","Please choose a delivery method i.e. pick up, delivery or both")
        if(!feePerMile) return AlertHelper.show('error',"Error","Please add Fee per mile")
        if(hasErrorInTiming !=null) return AlertHelper.show('error',"Error",`Open time must be greater then close time for ${hasErrorInTiming.day}`) 
        dispatch(setKitchenAvailability({kitchenStatus:isEnabled,delivery,pickup,kitchenAvailable,feePerMile}))
        AlertHelper.show("success","Success","Kitchen availablity saved successfully")
    }
    useEffect(() => {
        let kitchenA=kitchenDetail.kitchenAvailability
       if(kitchenA){
        if(kitchenA.kitchenAvailable) setKitchenAvailable(kitchenA.kitchenAvailable)
        if(kitchenA.delivery) setDelivery(kitchenA.delivery)
        if(kitchenA.pickup) setPickup(kitchenA.pickup)
        if(kitchenA.kitchenStatus) setIsEnabled(kitchenA.kitchenStatus)
       }
       else{
           setKitchenAvailability(available)
       }
    }, [kitchenDetail])
    console.log("hasErrorInTiming",hasErrorInTiming);
    return (
        <NormalContainer scrollable header={<Header showBack title={"Kitchen Availability"} onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} titleColor={appColors.thirdColor} />}>
            <View style={styles.viewSwitch}>
                <Text style={styles.title}>Kitchen Online/Offline</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#f4f3f4" }}
                    thumbColor={isEnabled ? appColors.secondaryColor : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled} 
                />
            </View>
            <View style={styles.body}>
                {
                    days.map((data, key) => {
                        return (
                            <View key={key} style={styles.mapView}>
                                <View style={[styles.fdRow, { width: scale(130) }]}>
                                    <CustomCheck checked={kitchenAvailable[key].enable} onPress={()=>addAvailability(data)} />
                                    <Text style={styles.txtDay}>{data}</Text>
                                </View>
                                <View style={[styles.fdRow, { flex: 1 }]}>
                                    <View style={styles.pickerView}>
                                        <RNPickerSelect
                                        pickerProps={{
                                            mode:"dropdown"
                                        }}
                                            onValueChange={(value) => addAvailability("",{value,data},)}
                                            items={pickerData}
                                            placeholder={{}}
                                            value={kitchenAvailable[key].open}
                                            useNativeAndroidPickerStyle={false}
                                            style={pickerSelectStyles}
                                        />
                                    </View>
                                    <View style={styles.pickerView}> 
                                        <RNPickerSelect
                                         pickerProps={{
                                            mode:"dropdown", 
                                        }}
                                            onValueChange={(value) => addAvailability("","",{value,data})}
                                            items={pickerData}
                                            placeholder={{}}
                                            value={kitchenAvailable[key].close}
                                            useNativeAndroidPickerStyle={false}
                                            style={pickerSelectStyles}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
                <View style={[{marginTop:scale(10),}]}>
                <View style={[styles.fdRow, {marginVertical:scale(10),width:scale(150)}]}>
                    <CustomCheck checked={delivery} onPress={()=>setDelivery(prev=>!prev)} />
                    <Text style={styles.txtDay}>Delivery</Text>
                </View>
                <View style={[styles.fdRow, {marginVertical:scale(10),width:scale(150)}]}>
                    <CustomCheck checked={pickup} onPress={()=>setPickup(prev=>!prev)}/>
                    <Text style={styles.txtDay}>Pickup</Text>
                </View>
                <View style={[styles.fdRow, {marginVertical:scale(10),alignItems:"center"}]}>
                <Text style={styles.txtDay}>Fee Per Mile</Text>
                <InputField onChangeText={(chnage)=> setFeePerMile(chnage)} style={{flex:1}} placeholder={"Ex:£0.25"} keyboardType={"number-pad"}/>
                </View>
                
                </View>
                
                
                <CustomButton label={"Save"} onPress={onSave}/>
            </View>
        </NormalContainer>
    )
}

const styles = StyleSheet.create({
    center:{
        alignItems:"center",
        justifyContent:"center"
    },
    title: {
        color: appColors.forthColor,
        textAlign: "center",
        fontSize: scale(14),
        fontFamily: "JosefinSans-SemiBold",
        marginVertical: scale(20)
    },
    viewSwitch: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: scale(20)
    },
    body: {
        paddingHorizontal: scale(20)
    },
    mapView: {
        flexDirection: "row",
        marginVertical: scale(5),
        alignItems: "center"
        //  justifyContent: "space-between" 
    },
    pickerView: {
        height: scale(40),
        //   backgroundColor: "red",
        //    width: scale(100) ,
        flex: 1,
        borderWidth: scale(1),
        borderColor: appColors.black22,
        borderRadius: scale(5),
        marginLeft: scale(10)
    },
    fdRow: {
        flexDirection: "row"
    },
    txtDay: {
        paddingHorizontal: scale(10),
        fontSize: scale(14),
        fontFamily: "JosefinSans-SemiBold"
    },
})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        textAlign: "center",
        fontSize: scale(10),
        color: appColors.forthColor,
        fontFamily: "JosefinSans-Regular",
    },
    inputAndroid: {
        textAlign: "center",
        fontSize: scale(10),
        color: appColors.forthColor,
        fontFamily: "JosefinSans-Regular",
    },
});