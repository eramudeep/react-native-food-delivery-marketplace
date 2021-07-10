import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'
import ICNext from '../SVG/ICNext'

export default function ProfileButton({label,showIcon,onPress,style}) {
    return (
        <TouchableRipple onPress={onPress} rippleDuration={800} rippleColor={appColors.thirdColor} style={[styles.btnView,style]}>
                <Text style={styles.label}>{label}</Text>
                    {
                        showIcon && <ICNext size={scale(20)}/>
                    }
            </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    btnView:{
        flexDirection:"row",
        paddingHorizontal:scale(20),
        borderBottomWidth:scale(1),
        borderColor:appColors.borderColor,
        height:scale(50),
        alignItems:'center'
},
label:{
    flex:1,
    color:appColors.forthColor,
    fontFamily:'JosefinSans-SemiBold',
    fontSize:scale(16)

}
})
