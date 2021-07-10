import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NormalContainer from '../../components/Container/NormalContainer'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { appColors } from '../../utils/appColors'
import { scale } from 'react-native-size-matters'
import Container from '../../components/Container'
import getIcon from '../../utils/getIcon'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'

export default function PhoneVerification({navigation}) {
    return (
        <Container style={{}} bg={getIcon("img7")}>
            
            <View style={styles.center}>
            {/* <Text  style={[styles.title,{marginTop:scale(50)}]}>Verification Code</Text> */}
            <Text  style={[styles.title,{fontFamily:"JosefinSans-Light"}]}>We need to text you the OTP to authenticate your account</Text>
            <View>
    <CustomInput placeholder={"phone number"} icon={<Text style={styles.input}>+91</Text>}/>
    <CustomButton label={"Send OTP"} onPress={()=>navigation.navigate("OtpVerification")}/>
            </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    center:{
// alignItems:"center",
justifyContent:"center",flex:1
    },
    input:{
        fontSize:scale(16),
        // paddingHorizontal:scale(20),
        color:appColors.white,
        fontFamily:"JosefinSans-Regular",
        // flex:1
    },
    title:{
        color:appColors.white,
        fontSize:scale(20),
        textAlign:"center",
        paddingHorizontal:scale(50),
        fontFamily:'JosefinSans-SemiBold',
        marginVertical:scale(10)
        // fontWeight:"bold"
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: appColors.secondaryColor,
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: appColors.secondaryColor,
    },
});
