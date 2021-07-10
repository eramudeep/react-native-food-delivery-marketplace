import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { scale } from 'react-native-size-matters'
import { appColors } from '../../utils/appColors'
import getIcon from '../../utils/getIcon'
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux'
import readDoc from '../../backend/firebase/readDoc'
import { getItem, getKitchenAvailability, getKitchenDetail, getKitchenList, getSellerAccount, setAccountMode, setUserData } from '../../redux/actions'
import { setFcm } from '../../backend/firebase/getFCM'

const { height, width } = Dimensions.get("window")
export default function Splash({ navigation }) {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.auth)
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //       navigation.navigate("Login")
    //     }, 2000);
    //     return () => clearTimeout(timer);
    //   }, []);
    const onAuthStateChanged = (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    async function checkUserInfo(user) {
        await setFcm()
        await readDoc("users", user.uid)
            .then(async user => {
                // navigation.navigate("Welcome")
                if (!user.data()) return
                dispatch(setUserData({ data: user.data() }))
                const mode = user.data()["accountType"]
                if (user.data() && !user.data()["accountType"]) {
                    navigation.navigate("Welcome")
                    return
                }
                dispatch(getKitchenList())
                dispatch(getKitchenDetail())
                dispatch(getItem())
                dispatch(getSellerAccount())
                dispatch(getKitchenAvailability())
                dispatch(setAccountMode({ accountType: user.data().accountType }))
                // if (mode === "seller") {
                //     dispatch(getKitchenDetail())
                //     dispatch(getItem())
                //     dispatch(getSellerAccount())
                //     dispatch(getKitchenAvailability())
                // }
                navigation.navigate("BottomTab", { screen: "Home" })
            }).catch(err => { console.log("error ", err); })
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    useEffect(() => {
        if (!initializing) {
            if (!user) {
                navigation.navigate("Login")
            }
            else {
                checkUserInfo(user)

            }
        }
    }, [user, initializing])
    if (initializing) {
        return (
            <View  style={styles.container}>
                <Image source={getIcon("logo")} resizeMode={"contain"} style={{ height: scale(250), width: scale(250) }} />
            </View>
        )
        return (
            <ImageBackground source={getIcon("splash")} resizeMode={"cover"} style={styles.container}>
                <Image source={getIcon("logo")} resizeMode={"contain"} style={{ height: scale(250), width: scale(250) }} />
            </ImageBackground>
        )
    }
    return (
        <View  style={styles.container}>
            <Image source={getIcon("logo")} resizeMode={"contain"} style={{ height: scale(250), width: scale(250) }} />
        </View>
    )
    return (
        <ImageBackground source={getIcon("splash")} resizeMode={"cover"} style={styles.container}>
            <Image source={getIcon("logo")} resizeMode={"contain"} style={{ height: scale(250), width: scale(250) }} />
        </ImageBackground>
    )

}
const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appColors.white
    },
})
