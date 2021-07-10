import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { appColors } from '../utils/appColors'

export default function Empty({message}) {
    return (
        <Text style={styles.empty}>{message||"no items"}</Text>
    )
}

const styles = StyleSheet.create({
    empty:{
        textAlign:"center",
        fontFamily:"JosefinSans-Medium",
        color:appColors.gray,
        fontSize:scale(16),
        marginVertical:scale(20),
},
})
