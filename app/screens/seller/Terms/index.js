import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import Container from '../../../components/Container'
import CustomButton from '../../../components/CustomButton'
import ICChecked from '../../../components/SVG/ICChecked'
import ICCircle from '../../../components/SVG/ICCircle'
import { appColors } from '../../../utils/appColors'
import getIcon from '../../../utils/getIcon'

export default function Terms({navigation}) {
    const [checked, setChecked] = useState(false)
    return (
        <Container  bg={getIcon("img1")}>
            <Text style={styles.title}>Before you start Selling</Text>
            <View style={[styles.termsView,styles.center]}>
            <Text style={[styles.title,{color:appColors.black}]}>Terms and conditions</Text>
            </View>
            <View style={[styles.center, styles.bottom]}>
                <TouchableRipple 
                rippleColor={appColors.white} 
                style={styles.btnChecked}
                onPress={()=>setChecked(!checked)}>
                    {checked ?
                        <ICChecked size={scale(20)} />
                        :
                        <ICCircle size={scale(20)} />
                    }
                </TouchableRipple>
                <Text style={styles.Txtaccpt}>I accept & confirm</Text>

            </View> 
            <CustomButton disabled={!checked} label="Continue"  onPress={()=>navigation.navigate("BottomTab")}/>
        </Container>
    )
}

const styles = StyleSheet.create({
    title: {
        color: appColors.white,
        fontSize: scale(18),
        textAlign: "center",
        paddingHorizontal: scale(50),
        fontFamily: 'JosefinSans-Bold',
        marginTop:scale(20)
        // fontWeight:"bold"
    },
    termsView: {
        flex: 1,
        backgroundColor: appColors.white,
        marginVertical: scale(40),
        marginHorizontal: scale(20),
        borderRadius: scale(10)
    },
    Txtaccpt: {
        color: appColors.white,
        fontFamily: "JosefinSans-Light", paddingHorizontal: scale(20)
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    bottom: {
        marginVertical: scale(20),
        flexDirection: "row",
    },
    btnChecked:{
        borderRadius:scale(10),
        overflow:"hidden",
},
})
