import React from 'react'
import { StyleSheet, Text, View,TextInput } from 'react-native'
import { scale } from 'react-native-size-matters'
import { appColors } from '../../utils/appColors'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CustomDatePicker({icon,show,value,onChange}) {
    return (
        <View style={styles.container}>
            {icon}
            {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value||new Date().toLocaleDateString()}
          mode={"date"}
          display="default"
          onChange={onChange}
        />
      )}
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
