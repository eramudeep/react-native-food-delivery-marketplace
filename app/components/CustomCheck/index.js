import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'
import ICChecked from '../SVG/ICChecked'
import ICCircle from '../SVG/ICCircle'

export default function CustomCheck({checked,onPress}) {
    return (
        <TouchableRipple 
                rippleColor={appColors.forthColor} 
                style={styles.btnChecked}
                // hitSlop={{top: 5, bottom: 5, left: 20, right: 20}}
                onPress={onPress}>
                    {checked ?
                        <ICChecked size={scale(20)} />
                        :
                        <ICCircle size={scale(20)} />
                    }
                </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    btnChecked:{
        borderRadius:scale(10),
        height:scale(20),
        width:scale(20),
        overflow:"hidden",
        marginBottom:scale(5)
},
})
