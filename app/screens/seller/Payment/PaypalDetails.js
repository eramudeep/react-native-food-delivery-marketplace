import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import InputField from '../../../components/CustomInput/InputField'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import { addSellerAccount } from '../../../redux/actions'
import { AlertHelper } from '../../../utils/AlertHelper'

export default function PaypalDetails({navigation}) {
    const dispatch = useDispatch()
    const {sellerAcDetails} = useSelector(state => state.payment)
    const [accountName, setAccountName] = useState()
    const [paypalEmail, setPaypalEmail] = useState()
    const [modalVisible, setModalVisible] = useState(false)
console.log("seller ac",sellerAcDetails);
    useEffect(() => {
        if(Object.keys(sellerAcDetails).length>0){
            if(sellerAcDetails["paypalDetails"]){
                setAccountName(sellerAcDetails["paypalDetails"].accountName)
                setPaypalEmail(sellerAcDetails["paypalDetails"].paypalEmail)
            }
        }
    }, [])

    const checkEmpty=()=>{
        if(!accountName) return "Account Name"
        if(!paypalEmail) return "Paypal Email"
    }
    const toggleModal=()=>{
        const isEmpty=checkEmpty()
        if(isEmpty) return AlertHelper.show("error","Error",`${isEmpty} is required.`)
        setModalVisible(prev=>!prev)
    }
    const saveDetails=()=>{
        dispatch(addSellerAccount({paypalDetails:{accountName,paypalEmail}}))
        AlertHelper.show("success","Success","Paypal details save successfully!")
        toggleModal()
        // navigation.navigate("SavedMessage")
    }
    return (
        <NormalContainer>
            <InputField placeholder={"Account Name"} value={accountName} onChangeText={(val)=>setAccountName(val)}/>
            <InputField placeholder={"Paypal Email Address"} value={paypalEmail} onChangeText={(val)=>setPaypalEmail(val)}/>
            <CustomButton label={"Save"}  onPress={toggleModal}/>
            <ConfirmationModal message={"Are you sure want to save paypal details?"} visible={modalVisible} onCancel={toggleModal} onConfirm={saveDetails} />
        </NormalContainer>
    )
}

const styles = StyleSheet.create({

})