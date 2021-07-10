import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { useDispatch } from 'react-redux'
import readDoc from '../../backend/firebase/readDoc'
import { createUserWithEmail } from '../../backend/socialAuth/signinWithEmail'
import Container from '../../components/Container'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import ICLock from '../../components/SVG/ICLock'
import ICMail from '../../components/SVG/ICMail'
import ICMobile from '../../components/SVG/ICMobile'
import ICUpload from '../../components/SVG/ICUpload'
import ICUser from '../../components/SVG/ICUser'
import { getItem, getKitchenDetail, getKitchenList, getSellerAccount, setAccountMode, setUserData } from '../../redux/actions'
import { AlertHelper } from '../../utils/AlertHelper'
import { appColors } from '../../utils/appColors'
import getIcon from '../../utils/getIcon'
import * as ImagePicker from 'react-native-image-picker'
import LoadingModal from '../../components/Modals/LoadingModal'
import { UkPhoneRegx } from '../../utils/CONSTANTS'

export default function Register({ navigation }) {
    const dispatch = useDispatch()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPass, setConfirmPass] = useState()
    const [mobile, setMobile] = useState()
    const [image, setImage] = useState()
    const [modalVisible, setModalVisible] = useState(false)

    const checkIfEmpty = () => {
        if (!name) return "Name"
        if (!email) return "Email"
        if (!password) return "Password"
        if (!mobile) return "Mobile"
    }
    const passwordChecker = () => {
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if (!regularExpression.test(password)) return "has"
        if (password !== confirmPass) return "notMatched"
    }
    const onRegister = async () => {
        if(UkPhoneRegx.test(`0${mobile}`)){
            console.log("has uk noumber");
        }
        return
        const hasEmpty = checkIfEmpty()
        if (hasEmpty) return AlertHelper.show("error", "Error", `${hasEmpty} is required`)
        const passCheck = passwordChecker()
        if (passCheck === "has") return AlertHelper.show('error', "Error", `A minimum 8 characters password contains a combination of uppercase and lowercase letter and number and special character is required.`)
        if (passCheck === "notMatched") return AlertHelper.show('error', "Error", "Password not matched please confirm again")
        setModalVisible(true)
        const res = await createUserWithEmail({ email, password, name, mobile,image })
        setModalVisible(false)
    }
    const onUpload = async () => {
        await ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 500,
                maxWidth: 500,
                quality: 0.5
            },
            async (response) => {
                setImage(response.uri)
                return response
            },
        )
    }
    async function checkUserInfo(user) {
        await readDoc("users", user.uid)
            .then(async user => {
                if (!user.data()) return
                const mode = user.data()["accountType"]
                dispatch(setUserData({ data: user.data() }))
                if (user.data() && !mode) {
                    navigation.navigate("Welcome")
                    return
                }
                dispatch(getKitchenList())
                dispatch(setAccountMode({ accountType: user.data().accountType }))
                if (mode === "seller") {
                    dispatch(getKitchenDetail())
                    dispatch(getItem())
                    dispatch(getSellerAccount())
                }
                navigation.navigate("BottomTab", { screen: "Home" })
            }).catch(err => { console.log("error ", err); })
    }
    return (
        <Container scrollEnabled bg={getIcon("img18")}>
            <View style={[{ flex: 1, marginTop: scale(30) }]}>
                <View style={styles.center}>
                    <ImageBackground source={{ uri: image }} resizeMode={"center"} style={[styles.imgView, styles.center]}>
                        {!image && <ICUser width={scale(30)} height={scale(30)} />}
                        <TouchableRipple rippleDuration={800} rippleColor={appColors.white} style={{ position: "absolute", bottom: 0, right: 0 }} onPress={onUpload}>
                            <ICUpload size={scale(40)} />
                        </TouchableRipple>
                    </ImageBackground>
                </View>
                <CustomInput placeholder={"Name"} icon={<ICUser width={20} height={20} />} value={name} onChangeText={(val) => setName(val)} />
                <CustomInput placeholder={"Email"} icon={<ICMail width={20} height={20} />} value={email} onChangeText={(val) => setEmail(val)} />
                <CustomInput placeholder={"Password"} secureTextEntry icon={<ICLock width={20} height={20} />} value={password} onChangeText={(val) => setPassword(val)} />
                <CustomInput placeholder={"Confirm Password"} secureTextEntry icon={<ICLock width={20} height={20} />} value={confirmPass} onChangeText={(val) => setConfirmPass(val)} />
                <CustomInput placeholder={"Mobile"} icon={<Text style={styles.input}>+44</Text>}  value={mobile} onChangeText={(val) => setMobile(val)} />
                <CustomButton label={"Register"} buttonStyle={{ marginVertical: scale(20) }} onPress={onRegister} />
            </View>
            <View style={[styles.center, { flexDirection: "row" }]}>

                <Text style={styles.txtCreate}>Already have an account?</Text>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("Login")}>
                    <Text style={[styles.txtCreate, { color: appColors.secondaryColor, fontFamily: "JosefinSans-Regular" }]}>Login</Text>
                </TouchableOpacity>
            </View>
            <LoadingModal visible={modalVisible} />
        </Container>
    )
}

const styles = StyleSheet.create({
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: appColors.white,
        fontSize: scale(30),
        fontWeight: "bold"
    },
    forgot: {
        color: appColors.white,
        textAlign: "right",
        paddingHorizontal: scale(20)
    },
    txtCreate: {
        color: appColors.white,
        textAlign: "center",
        // borderBottomWidth:0.5,
        marginBottom: scale(20),
        // borderBottomColor:appColors.white,
        paddingBottom: scale(5),
        fontFamily: "JosefinSans-Light",
        fontSize: scale(14)
    },
    imgView: {
        height: scale(120),
        width: scale(120),
        backgroundColor: appColors.white30,
        borderRadius: scale(60)
    },
    input:{
        fontSize:scale(16),
        // paddingHorizontal:scale(20),
        color:appColors.white,
        fontFamily:"JosefinSans-Regular",
        // flex:1
    },
})
