import React from 'react'
import { StyleSheet, Text, View,Linking } from 'react-native'
import { scale } from 'react-native-size-matters'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import { appColors } from '../../../utils/appColors'

export default function Confirmation({navigation}) {
    return (
        <NormalContainer>
            <View style={{paddingHorizontal:scale(20)}}>
            <Text style={styles.title}>Thank you for your order(xxxxxx).</Text>
            <Text style={[styles.title,{marginTop:scale(30)}]}>Your order is waiting to be confirmed by Sarah's Kitchen</Text>
        <CustomButton label="Still Hungry ?" onPress={()=>navigation.navigate("Dashboard")}/>
            </View>
        </NormalContainer> 
    )
}

const styles = StyleSheet.create({
    title: {
        color: appColors.forthColor,
        fontSize: scale(14),
        fontFamily: "JosefinSans-SemiBold",
        marginVertical: scale(20),
        paddingRight: scale(20),
        marginTop:scale(50)
    },
})
