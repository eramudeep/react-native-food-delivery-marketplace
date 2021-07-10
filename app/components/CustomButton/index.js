import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'
export default function CustomButton({label,onPress,buttonStyle,disabled}) {
    return (
        <TouchableRipple disabled={disabled} rippleColor={appColors.white} rippleDuration={800} onPress={onPress} style={[styles.container,styles.center,buttonStyle,disabled&&{backgroundColor:appColors.gray}]}>
                <Text style={styles.label}>{label}</Text>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    container:{
        height:scale(50),
        backgroundColor:appColors.secondaryColor,
        borderRadius:scale(10),
        margin:scale(20),
        paddingHorizontal:scale(20)
    },
    center:{
        alignItems:"center",
        justifyContent:"center"
    },
    label:{
        color:appColors.white,
        fontSize:scale(16),
        fontFamily:"JosefinSans-Regular"
    }
})
