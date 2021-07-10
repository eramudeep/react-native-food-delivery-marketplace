import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Switch, Linking } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomBottomTab from '../../../components/CustomBottomTab'
import ProfileButton from '../../../components/CustomButton/ProfileButton'
import Header from '../../../components/Header'
import ICNext from '../../../components/SVG/ICNext'
import { appColors } from '../../../utils/appColors'
import Slider from '@react-native-community/slider';
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import { useDispatch, useSelector } from 'react-redux'
import { setAccountMode, signOut } from '../../../redux/actions'
import ICLoading from '../../../components/SVG/ICLoading'
import auth from '@react-native-firebase/auth'
import { AlertHelper } from '../../../utils/AlertHelper'
import DeleteAccountModal from '../../../components/Modals/DelectAccountModal'

export default function Profile({ navigation, route }) {
    const { accountType, userData } = useSelector(state => state.auth)
    // const state = useSelector(state => state)
    const [isEnabled, setIsEnabled] = useState(accountType === "seller");
    const [modalVisible, setModalVisible] = useState(false)
    const [signoutModal, setSignoutModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [showChangePass, setShowChangePass] = useState(false)
    const [distance, setDistance] = useState(5)
    const dispatch = useDispatch()
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        // console.log("account type",state);
        dispatch(setAccountMode({ accountType: !isEnabled ? "seller" : "buyer" }))

    };
    const toggleModal = () => {
        if (!auth().currentUser) return AlertHelper.show("error", "Error", "You need to login first for selling mode")
        setModalVisible(previousState => !previousState);
    }
    const toggleSignoutModal = () => {
        setSignoutModal(prev => !prev)
    }
    // console.log("navigation", route);
    const _onConfirm = () => {
        toggleModal()
        toggleSwitch()
    }
    const _onCancel = () => {
        toggleModal()
    }
    const onSignOut = () => {
        dispatch(signOut())
    }
    useEffect(() => {
        navigation.navigate("Home")
    }, [accountType])
    useEffect(() => {
        const resUser = auth().currentUser && auth().currentUser.providerData
        // console.log("auth user=>>",resUser[0].providerId);
        if (resUser && resUser[0].providerId === "password") {
            setShowChangePass(true)
        }
    }, [])
    const onInactive = () => {

        dispatch(signOut())
    }
    const onDelete = () => {

    }
    return (
        <NormalContainer header={<Header backColor={appColors.thirdColor} onBack={() => navigation.goBack()} title={"Your Account"} titleColor={appColors.thirdColor} />}>
            <View style={{ flex: 1 }}>
                <View style={styles.viewSwitch}>
                    <Text style={styles.sTitle}>{isEnabled ? "Seller Mode" : "Buyer Mode"}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#f4f3f4" }}
                        thumbColor={isEnabled ? appColors.secondaryColor : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleModal}
                        value={isEnabled}
                    />
                </View>

                <View style={styles.title}>
                    {/* <ICLoading size={100}/> */}
                    <Text style={styles.label}>Account</Text>
                </View>
                {Object.keys(userData).length < 1 ?
                    <View>
                        <ProfileButton label={"Login"} showIcon onPress={() => navigation.navigate("Login")} />
                        <ProfileButton label={"Create Account"} showIcon onPress={() => navigation.navigate("Register")} />
                    </View>
                    : <ProfileButton label={"Edit Account"} showIcon onPress={() => navigation.navigate("EditProfile")} />
                }
                {showChangePass && <ProfileButton label={"Change Password"} showIcon onPress={() => navigation.navigate("ChangePassword")} />}
                <ProfileButton label={"Need Help?"} showIcon onPress={() => Linking.openURL('mailto:support@mealempire.com')} />

                {Object.keys(userData).length > 0 &&
                    <View>
                        <ProfileButton label={"Delete Account"} showIcon onPress={() => setDeleteModal(prev => !prev)} />
                        <ProfileButton label={"Sign Out"} showIcon onPress={toggleSignoutModal} />
                    </View>
                }
                {!isEnabled &&
                    <View style={[styles.viewSwitch, { flexDirection: "column", marginTop: scale(50) }]}>
                        <Slider
                            style={{ height: 40 }}
                            minimumValue={5}
                            maximumValue={30}
                            minimumTrackTintColor={appColors.secondaryColor}
                            maximumTrackTintColor="#000000"
                            // thumbColor=
                            thumbTintColor={appColors.secondaryColor}
                            step={1}
                            // value={distance}
                            onValueChange={(val) => setDistance(val)}
                        />
                        <Text style={styles.nearbyTitle}>Nearby kitchens between {distance} miles</Text>
                    </View>}
            </View>
            <ConfirmationModal
                visible={modalVisible}
                onConfirm={_onConfirm}
                onCancel={_onCancel}
                message={"Are you sure want to switch your account mode?"}
            />
            <ConfirmationModal
                visible={signoutModal}
                onConfirm={onSignOut}
                onCancel={() => setSignoutModal(prev => !prev)}
                message={"Are you sure want to sign out your account?"}
            />
            <DeleteAccountModal
                message={"Please choose one of following:"}
                onCancel={() => setDeleteModal(prev => !prev)}
                visible={deleteModal}
                onInactive={onInactive}
                onDelete={onDelete}
            />
        </NormalContainer>
    )
}

const styles = StyleSheet.create({
    title: {
        height: scale(50),
        backgroundColor: appColors.secondaryColor5,
        paddingHorizontal: scale(20),
        justifyContent: "center"
    },
    label: {
        // flex:1,
        color: appColors.forthColor,
        fontFamily: 'JosefinSans-SemiBold',
        fontSize: scale(16)

    },
    sTitle: {
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
    nearbyTitle: {
        color: appColors.forthColor,
        textAlign: "center",
        fontSize: scale(16),
        fontFamily: "JosefinSans-SemiBold",
        // marginVertical: scale(20)
    },
})
