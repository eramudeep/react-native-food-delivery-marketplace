import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'
import { scale } from 'react-native-size-matters'
import { appColors } from '../../utils/appColors'

export default function CustomInput({icon,placeholder,secureTextEntry,value,onChangeText}) {
    return (
        <View style={styles.container}>
            {icon}
            <TextInput
            placeholder={placeholder}
            placeholderTextColor={appColors.white}
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:scale(50),
        backgroundColor:appColors.white30,
        marginHorizontal:scale(20),
        marginVertical:scale(10),
        borderRadius:scale(10),
        paddingHorizontal:scale(20),
        flexDirection:"row",
        alignItems:"center"
    },
    input:{
        fontSize:scale(16),
        paddingHorizontal:scale(20),
        color:appColors.white,
        fontFamily:"JosefinSans-Regular",
        flex:1
    },
})
