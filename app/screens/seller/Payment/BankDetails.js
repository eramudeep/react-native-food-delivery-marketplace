import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native'
import { scale } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import { createAPI, updateAPI } from '../../../APIS/ApiURL'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import InputField from '../../../components/CustomInput/InputField'
import Header from '../../../components/Header'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import LoadingModal from '../../../components/Modals/LoadingModal'
import AddAccount from '../../../components/stripePayment/AddAccount'
import { addSellerAccount } from '../../../redux/actions'
import { AlertHelper } from '../../../utils/AlertHelper'
import { appColors } from '../../../utils/appColors'
import postRequestData from '../../../utils/postRequestData'
const {height,width}=Dimensions.get("window")
var numOnly = /^[0-9]+$/;
export default function BankDetails({navigation}) {
    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch()
    const {sellerAcDetails} = useSelector(state => state.payment)
    const [accountName, setAccountName] = useState('')
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    const [postalCode, setPostalCode] = useState()
    const [ifseCode, setIfseCode] = useState('')
    const [branchName, setBranchName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [hasData, setHasData] = useState(false)
    console.log("sellerAcDetails",sellerAcDetails);
    const checkEmpty=()=>{
        if(!email) return "Email"
        return
        if(!accountName) return "First Name"
        if(!lastName) return "Last Name"
        
        if(!phone) return "Phone"
        if(!address) return "Address"
        if(!city) return "City"
        if(!state) return "State"
        if(!postalCode) return "Postal Code"
    }
    useEffect(() => {
        if(Object.keys(sellerAcDetails).length>0){

            setEmail(sellerAcDetails.account.email)
            setHasData(true)
        }
    }, [sellerAcDetails])
    const toggleModal=()=>{
        const isEmpty=checkEmpty()
        if(isEmpty) return AlertHelper.show("error","Error",`${isEmpty} is required.`)
        // if(!accountNumber.match(numOnly)) return AlertHelper.show("error","Error",`Please enter correct bank account number`)
        
        setModalVisible(prev=>!prev)
    }
    const saveDetails=async()=>{
        toggleModal()
        setIsLoading(true)
        const resposee= await postRequestData(createAPI,{email}).then(response => response.json())
        .then(result => {return result}).catch(err=>{console.log(err);})
        // dispatch(addSellerAccount({bankDetails:{accountName,accountNumber,ifseCode,branchName}}))
      console.log("response==>>>>>>>>>>>",resposee);
      if(!resposee){
        AlertHelper.show("error","Error","Please check your details and try again")
        // toggleModal()
        setIsLoading(false)
        return
       }
       AlertHelper.show("success","Success","information Saved!")
        dispatch(addSellerAccount(resposee?.account))
        navigation.goBack()
        return
      const{external_accounts,id}=resposee?.account?.account
      console.log(id);
      const resul= await postRequestData(updateAPI,{
          account_id:id,
          city,
          postal_code:postalCode,
          line1:address,
          state,
          first_name:accountName,
          last_name:lastName,
          phone,
          email,
          day:1,
          month:1,
          year:2000,
          url: "http://funogram.ca/"
        }).then(response => response.json())
        .then(result => {return result}).catch(err=>{console.log(err);})
        console.log("final Restu;r",resul);
        setIsLoading(false)
       if(resul){
        AlertHelper.show("success","Success","information Saved!")
        dispatch(addSellerAccount(resul))
        
        // navigation.navigate("UploadDocuments")
       }
       else AlertHelper.show("error","Error","Please check your details and try again")
       
        // navigation.navigate("SavedMessage")
    }
    return(
        <NormalContainer scrollable header={<Header showBack title={"Payments"} onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} titleColor={appColors.thirdColor} />}>
             <Text style={{fontFamily:"JosefinSans-Regular",fontSize:scale(16),textAlign:"center",padding:scale(20)}}>Please enter your email address for stripe payments</Text>
             <InputField disable={hasData} placeholder={"Email address"} value={email} onChangeText={(val)=>setEmail(val)}/>
             <CustomButton disabled={hasData} label={"Submit"} onPress={toggleModal}/>
             {hasData &&<Text style={{fontFamily:"JosefinSans-Regular",fontSize:scale(16),textAlign:"center",padding:scale(20)}}>Your email has been connected.</Text>}
            <ConfirmationModal message={"Are you sure want to save bank details?"} visible={modalVisible} onCancel={toggleModal} onConfirm={saveDetails} />
            <LoadingModal visible={isLoading}/>
            </NormalContainer>
    )
    return (
        <NormalContainer scrollable header={<Header showBack title={"Bank Details"} onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} titleColor={appColors.thirdColor} />}>
            <InputField placeholder={"First Name"} value={accountName} onChangeText={(val)=>setAccountName(val)}/>
            <InputField placeholder={"Last Name"} value={lastName} onChangeText={(val)=>setLastName(val)}/>
            <InputField placeholder={"Email address"} value={email} onChangeText={(val)=>setEmail(val)}/>
            <InputField placeholder={"Phone number"} keyboardType={"phone-pad"} value={phone} onChangeText={(val)=>setPhone(val)}/>
            <InputField placeholder={"Address"}  value={address} onChangeText={(val)=>setAddress(val)}/>
            <InputField placeholder={"city"}  value={city} onChangeText={(val)=>setCity(val)}/>
            <InputField placeholder={"State"}  value={state} onChangeText={(val)=>setState(val)}/>
            <InputField placeholder={"Postal code"}  value={postalCode} onChangeText={(val)=>setPostalCode(val)}/>
            {/* <InputField placeholder={"Branch Name"} value={branchName} onChangeText={(val)=>setBranchName(val)}/> */}
            <CustomButton label={"Next"} onPress={toggleModal}/>
            <ConfirmationModal message={"Are you sure want to save bank details?"} visible={modalVisible} onCancel={toggleModal} onConfirm={saveDetails} />
        {/* <View style={{flex:1,backgroundColor:"red",position:"absolute",zIndex:1000,height:height,width:width}}>
        <AddAccount onStateChange={(state)=>console.log(state)}/>
        </View> */}
        <LoadingModal visible={isLoading}/>
        </NormalContainer>
    )
}

const styles = StyleSheet.create({})
