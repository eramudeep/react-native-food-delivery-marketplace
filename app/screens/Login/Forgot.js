import React, { useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'
import { forgotPass } from '../../backend/socialAuth/forgotPass'
import Container from '../../components/Container'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import Header from '../../components/Header'
import ICLock from '../../components/SVG/ICLock'
import ICMail from '../../components/SVG/ICMail'
import { AlertHelper } from '../../utils/AlertHelper'
import { appColors } from '../../utils/appColors'
import getIcon from '../../utils/getIcon'

export default function Forgot({navigation}) {
    const [email, setEmail] = useState()
    const validateEmail=() =>{
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const onForgot=()=>{
        const res=validateEmail()
        if(!res) return AlertHelper.show("error","Error","Please enter valid email address")
        forgotPass(email)
    }
    return (
        <Container bg={getIcon("img2")}>
            <Header title={"Forgot Password"} showBack onBack={()=>navigation.goBack(null)}/>
            <View style={[styles.center,{flex:1,}]}>
                <Text style={styles.title}>Enter your email and will send you instructions on how to reset it</Text>
                
            </View>
            <View style={[{flex:2,}]}>
                <CustomInput placeholder={"Email"} value={email} onChangeText={val=>setEmail(val)} icon={<ICMail width={20} height={20}/>}/>
                <CustomButton label={"Send"} buttonStyle={{marginVertical:scale(60)}} onPress={onForgot}/>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    center:{
        alignItems:"center",
        justifyContent:"center"
    },
    title:{
        color:appColors.white,
        fontSize:scale(16),
        textAlign:"center",
        paddingHorizontal:scale(50),
        fontFamily:'JosefinSans-Light'
        // fontWeight:"bold"
    },
    forgot:{
        color:appColors.white,
        textAlign:"right",
        paddingHorizontal:scale(20)
    },
    txtCreate:{
        color:appColors.white,
        textAlign:"center",
        borderBottomWidth:0.5,
        marginBottom:scale(20),
        borderBottomColor:appColors.white,
        paddingBottom:scale(5)
    }
})
