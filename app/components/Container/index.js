import React from 'react'
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { appColors } from '../../utils/appColors'

export default function Container({ scrollEnabled, children,style,bg,containerStyle }) {
    return (
        <ImageBackground source={bg||require("../../assets/Images/bg.png")} resizeMode="cover" style={[styles.container,containerStyle]}>
            <View style={[styles.innerView,style]}>
                {scrollEnabled ? <ScrollView >
                    {children}
                </ScrollView> :
                    children
                }
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerView: { flex: 1, backgroundColor: appColors.black50}
})
