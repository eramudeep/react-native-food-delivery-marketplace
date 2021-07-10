import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NormalContainer from '../../components/Container/NormalContainer'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { appColors } from '../../utils/appColors'
import { scale } from 'react-native-size-matters'
import Container from '../../components/Container'
import getIcon from '../../utils/getIcon'
import Header from '../../components/Header'

export default function OtpVerification({navigation}) {
    return (
        <Container style={{}} bg={getIcon("img2")}>
            <Header title={"OTP Verification"} showBack onBack={()=>navigation.goBack(null)}/>
            <View style={styles.center}>
            <Text  style={[styles.title,{marginTop:scale(50)}]}>Verification Code</Text>
            <Text  style={[styles.title,{fontFamily:"JosefinSans-Light"}]}>Please type the verification code send to +918817425632</Text>
            <OTPInputView
                style={{ width: '80%', height: 200 }}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => { this.setState({code})}}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={(code) => {
                    navigation.navigate("Welcome")
                }}
            />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    center:{
alignItems:"center",
justifyContent:"center",flex:1
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
