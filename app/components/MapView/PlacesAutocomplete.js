import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { scale } from 'react-native-size-matters';
import { appColors } from '../../utils/appColors';

export default function PlacesAutocomplete({ icon, style, value, onPress,placeholder,onChangeText }) {
    return (
        <>
            {/* <View style={{position:"absolute",left:10,zIndex:1,to}}>
            {icon}
            </View> */}
            <GooglePlacesAutocomplete
                placeholder={placeholder||'Search'}
                onPress={onPress}
                query={{
                    key: 'AIzaSyAefnV7MLP6LDSWiItD5-Axfdpiowy2Ug0', 
                    language: 'en',
                    components:'country:uk'
                }}
                fetchDetails={true}
                debounce={200}
                textInputProps={{
                    value:value,
                    onChangeText:onChangeText
                }}
                styles={{
                    // textInputContainer: {
                    //   backgroundColor: 'grey',
                    // },
                    textInput: styles.input,
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    },
                    // row: {backgroundColor:"red",zIndex:100},
                    container:styles.container,
                      listView:{
                        
                    }
                    
                  }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // height: scale(50
        flex:1,
        backgroundColor: appColors.white,
        marginHorizontal: scale(20),
        // marginVertical: scale(10),
        marginTop:scale(17),
        borderRadius: scale(10),
        borderWidth: scale(1),
        borderColor: appColors.black22,
        paddingHorizontal: scale(20),
        // flexDirection: "row",
        alignItems: "center",
        // position:"absolute",
        // zIndex:10,
        // overflow:"visible",
    },
    input: {
        fontSize: scale(16),
        paddingHorizontal: scale(20),
        color: appColors.forthColor,
        fontFamily: "JosefinSans-Regular",
        flex: 1,
    },
})
