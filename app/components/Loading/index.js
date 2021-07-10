import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { appColors } from '../../utils/appColors'
import ICLoading from '../SVG/ICLoading'
export default function Loading() {
    return (
        <View style={{flex:1,alignItems:"center",justifyContent:"center",backgroundColor:appColors.white}}>
        <ICLoading size={scale(300)}/>
        </View>
    )
}

const styles = StyleSheet.create({})
