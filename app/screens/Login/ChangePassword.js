import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import { changePass } from '../../backend/socialAuth/changePass'
import NormalContainer from '../../components/Container/NormalContainer'
import CustomButton from '../../components/CustomButton'
import InputField from '../../components/CustomInput/InputField'
import Header from '../../components/Header'
import LoadingModal from '../../components/Modals/LoadingModal'
import { changePassword, editUserData } from '../../redux/actions'
import { AlertHelper } from '../../utils/AlertHelper'
import { appColors } from '../../utils/appColors'

export default function ChangePassword({ navigation }) {
    const dispatch = useDispatch()
    const [currentPass, setCurrentPass] = useState()
    const [newPass, setNewPass] = useState()
    const [confirmPass, setConfirmPass] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const checkIfEmpty = () => {
        if (!currentPass) return "Current password"
        if (!newPass) return "Mobile"
    }
    const passwordChecker = () => {
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if (!regularExpression.test(newPass)) return "has"
        if (newPass !== confirmPass) return "notMatched"
    }
    const onSave = async () => {
        const isEmpty = checkIfEmpty()
        if (isEmpty) return AlertHelper.show("error", "Error", `${isEmpty} is required`)
        const passCheck = passwordChecker()
        if (passCheck === "has") return AlertHelper.show('error', "Error", `A minimum 8 characters password contains a combination of uppercase and lowercase letter and number and special character is required.`)
        if (passCheck === "notMatched") return AlertHelper.show('error', "Error", "Password not matched please confirm again")
        setModalVisible(true)
        await changePass({currentPass,newPass})
        setModalVisible(false)
        clear()
    }
    const clear=()=>{
        setCurrentPass('')
        setNewPass('')
        setConfirmPass('')
    }
    return (
        <NormalContainer scrollable header={<Header showBack onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} />}>
            <Text style={styles.title}>Change Password</Text>
            <InputField placeholder={"Current Password"} secureTextEntry value={currentPass} onChangeText={(val) => setCurrentPass(val)} />
            {/* <InputField placeholder={"Kitchen Name"}/> */}
            <InputField  placeholder={"New Password"} secureTextEntry value={newPass} onChangeText={(val) => setNewPass(val)} />
            <InputField placeholder={"Confirm Password"} secureTextEntry value={confirmPass} onChangeText={(val) => setConfirmPass(val)} />
            <CustomButton label={"Change"} onPress={onSave} />
            <LoadingModal visible={modalVisible} />
        </NormalContainer>
    )
}

const styles = StyleSheet.create({
    title: {
        color: appColors.thirdColor,
        textAlign: "center",
        fontSize: scale(20),
        fontFamily: "JosefinSans-SemiBold",
        marginVertical: scale(20)
    }
})
