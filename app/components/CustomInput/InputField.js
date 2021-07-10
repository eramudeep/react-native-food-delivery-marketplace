import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'
import { scale } from 'react-native-size-matters'
import { appColors } from '../../utils/appColors'

export default function InputField({maxLength,icon,placeholder,secureTextEntry,style,inputStyle,value,onChangeText,keyboardType,disable,multiline}) {
    return (
        <View style={[styles.container,multiline&&{height:scale(100),alignItems:"flex-start"}, style]}>
            {icon}
            <TextInput
            placeholder={placeholder}
            placeholderTextColor={appColors.forthColor}
            style={[styles.input,inputStyle]}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType||"default"}
            editable={!disable}
            multiline={multiline}
            maxLength={maxLength}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height:scale(50),
        backgroundColor:appColors.white,
        marginHorizontal:scale(20),
        marginVertical:scale(10),
        borderRadius:scale(10),
        borderWidth:scale(1),
        borderColor:appColors.black22,
        paddingHorizontal:scale(20), 
        flexDirection:"row",
        alignItems:"center"
    },
    input:{
        fontSize:scale(16),
        paddingHorizontal:scale(20),
        color:appColors.forthColor,
        fontFamily:"JosefinSans-Regular",
        flex:1
    },
})
