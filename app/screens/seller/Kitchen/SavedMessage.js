import React from 'react'
import { StyleSheet, Text, View,Linking } from 'react-native'
import { scale } from 'react-native-size-matters'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import { appColors } from '../../../utils/appColors'

export default function SavedMessage({navigation}) {
    return (
        <NormalContainer>
            <View style={{paddingHorizontal:scale(20)}}>
            <Text style={styles.title}>Your details are saved successfully.</Text>
            <Text style={[styles.title,{marginTop:scale(30)}]}>If you have any querys please contact <Text style={{color:appColors.secondaryColor}} onPress={() => Linking.openURL('mailto:support@mealempire.com') }>support@mealempire.com</Text></Text>
        <CustomButton label="Home" onPress={()=>navigation.navigate("Home")}/>
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
