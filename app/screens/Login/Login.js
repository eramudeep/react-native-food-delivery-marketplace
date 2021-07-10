import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Platform } from 'react-native'
import { scale } from 'react-native-size-matters'
import { useDispatch } from 'react-redux'
import readDoc from '../../backend/firebase/readDoc'
import { googleSignIn } from '../../backend/socialAuth/googleSignin'
import Container from '../../components/Container'
import CustomButton from '../../components/CustomButton'
import SocialButton from '../../components/CustomButton/SocialButton'
import CustomInput from '../../components/CustomInput'
import ICLock from '../../components/SVG/ICLock'
import ICMail from '../../components/SVG/ICMail'
import { useOrientation } from '../../components/useOrientation'
import { getItem, getKitchenDetail, getKitchenList, getSellerAccount, setAccountMode, setUserData } from '../../redux/actions'
import { appColors } from '../../utils/appColors'
import getIcon from '../../utils/getIcon'
import auth from '@react-native-firebase/auth'
import LoadingModal from '../../components/Modals/LoadingModal'
import { facebookSignin } from '../../backend/socialAuth/facebookSignin'
import { signinWithEmail } from '../../backend/socialAuth/signinWithEmail'
import { AlertHelper } from '../../utils/AlertHelper'

export default function Login({ navigation }) {
    const [modalVisibl, setmodalVisibl] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const orientation = useOrientation();
    const dispatch = useDispatch()
    const onGoogle=async ()=>{
        setmodalVisibl(true)
        const res= await googleSignIn().catch((err)=>{console.log("errrrr",err);})
       
        setmodalVisibl(false)
        if(res) checkUserInfo(res)
    }
    const onFacebook=async()=>{
        setmodalVisibl(true)
        const res=  await facebookSignin()
        setmodalVisibl(false)
        if(res) checkUserInfo(res)
    }
    async function checkUserInfo (user) {
        await readDoc("users", user.uid)
            .then(async user => {
                // navigation.navigate("Welcome")
                
                const mode=user.data()["accountType"]
                dispatch(setUserData({data:user.data()}))
                if (user.data() && !mode) {
                    navigation.navigate("Welcome")
                    return
                }
                
                dispatch(getKitchenList())
                dispatch(setAccountMode({ accountType: user.data().accountType }))
                if(mode==="seller"){
                    dispatch(getKitchenDetail())
                    dispatch(getItem())
                   dispatch(getSellerAccount())
                }
                navigation.navigate("BottomTab",{screen:"Home"})
            }).catch(err=>{console.log("error ",err);})
    }
    const onGuest=()=>{

        // dispatch(setAccountMode({ accountType: "buyer" }))
        // navigation.navigate("BottomTab",{screen:"Home"})
        navigation.navigate("Welcome")
    }
    const onLogin=async()=>{
        const isError=checkIfEmpty()
        if(isError) return AlertHelper.show("error","Error",`${isError} is required`)
        setmodalVisibl(true)
        await signinWithEmail({email,password})
        setmodalVisibl(false)
    }
    const checkIfEmpty=()=>{
        if(!email) return "Email"
        if(!password) return "Password"
     }
    return (
        <Container bg={getIcon("img8")} scrollEnabled={orientation === "LANDSCAPE"}>
            <View style={[styles.center, { flex: 1, justifyContent: "flex-end" }]}>
                <Text style={styles.title}>Log In To Meal Empire</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <SocialButton icon="google" onPress={onGoogle}/>
                <SocialButton icon="facebook" onPress={onFacebook}/>
                <SocialButton icon="instagram" onPress={()=>{}}/>
                {Platform.OS==="ios" && <SocialButton icon="apple"/>}
            </View>
            <View style={[{ flex: 2, justifyContent: "flex-end" }]}>
                <CustomInput placeholder={"Email"} icon={<ICMail width={20} height={20} />} value={email} onChangeText={(val)=>setEmail(val)}/>
                <CustomInput placeholder={"Password"} secureTextEntry icon={<ICLock width={20} height={20} />} value={password} onChangeText={(val)=>setPassword(val)}/>
                <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>

                </TouchableOpacity>
                <CustomButton label={"Login"} buttonStyle={{ marginVertical: scale(20) }} onPress={onLogin} />
                {/* <Text style={[styles.txtCreate,{borderBottomWidth:0}]}>Or</Text> */}

                {/* <Text style={[styles.txtCreate,{borderBottomWidth:0}]}>Or</Text> */}
            </View>
            <View style={styles.center}>
                <TouchableOpacity activeOpacity={0.6} onPress={onGuest}>
                    <Text style={styles.txtCreate}>Continue as Guest</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("Register")}>

                    <Text style={styles.txtCreate}>Create New Account</Text>

                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.navigate("Forgot")}>

                    <Text style={styles.txtCreate}>Forgot Password?</Text>
                </TouchableOpacity>

            </View>
            <LoadingModal visible={modalVisibl}/>
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
        fontSize: scale(20),
        fontFamily: "JosefinSans-SemiBold",
        paddingVertical: scale(30)
    },
    forgot: {
        color: appColors.white,
        textAlign: "left",
        paddingHorizontal: scale(20),
        fontFamily: "JosefinSans-Regular",
        fontSize: scale(14)
    },
    txtCreate: {
        color: appColors.white,
        textAlign: "left",
        borderBottomWidth: 1,
        marginBottom: scale(20),
        borderBottomColor: appColors.white,
        paddingBottom: scale(0),
        fontFamily: "JosefinSans-Regular",
        fontSize: scale(14)
    }
})
