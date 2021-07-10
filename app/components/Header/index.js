import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'
import ICBack from '../SVG/ICBack'
import ICUser from '../SVG/ICUser'
import ICUserFilled from '../SVG/ICUserFilled'

export default function Header({ showBack, onBack, title,backColor,touchColor ,titleColor,showUser, onUser,containerStyle}) {
    return (
        <View style={[styles.container,containerStyle]}>
            <View style={{ width: scale(40),justifyContent:"center",alignItems:"center" }}>
                {showBack &&
                    <TouchableRipple hitSlop={{top: 10, bottom: 10, left: 30, right: 30}} rippleCentered rippleDuration={800} rippleColor={touchColor||appColors.white} style={styles.back} onPress={onBack}>
                        <ICBack height={scale(25)}  width={scale(25)} color={backColor||appColors.white} />
                    </TouchableRipple>

                }
            </View>
            <Text style={[styles.title,titleColor&&{color:titleColor}]}>{title}</Text>
            <View style={[{ width: scale(40) ,justifyContent:"center",alignItems:"center"},]}>
            {
                showUser &&
                <TouchableRipple hitSlop={{top: 10, bottom: 10, left: 30, right: 30}} rippleCentered rippleDuration={800} rippleColor={touchColor||appColors.white} style={styles.back} onPress={onUser}>
                <ICUserFilled height={scale(25)}  width={scale(25)} color={appColors.black}/>
            </TouchableRipple>
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: scale(50),
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(10),
    },
    title: {
        color: appColors.white,
        flex: 1,
        textAlign: "center",
        fontSize: scale(16),
        // letterSpacing: 1,
        // fontWeight: "bold"
        fontFamily:"JosefinSans-SemiBold"
    },
    back:{
        width:scale(30),
        height:scale(30),
        borderRadius:scale(30/2),
        // overflow:"hidden"
},
})
