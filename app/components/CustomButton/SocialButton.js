import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'
import ICApple from '../SVG/ICApple'
import ICFacebook from '../SVG/ICFacebook'
import ICGoogle from '../SVG/ICGoogle'
import ICInstagram from '../SVG/ICInstagram'

export default function SocialButton({icon,onPress}) {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.btn} onPress={onPress}>
            {icon==="google" && 
            <ICGoogle size={scale(30)}/>}
            {icon==="facebook" &&
            <ICFacebook size={scale(30)} />}
            {icon==="instagram" &&
            <ICInstagram size={scale(30)} />}
            {icon==="apple" &&
            <ICApple size={scale(30)} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn:{
        height:scale(50),
        width:scale(50),
        borderRadius:scale(25),
        backgroundColor:appColors.white,
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal:scale(10)
    }
})
