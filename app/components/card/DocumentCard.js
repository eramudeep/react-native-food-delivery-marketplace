import React, { useState } from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { scale } from 'react-native-size-matters'
import * as ImagePicker from 'react-native-image-picker'
import { appColors } from '../../utils/appColors'
import TouchableRipple from 'react-native-touch-ripple'
import DocumentPicker from 'react-native-document-picker';
export default function DocumentCard({label,onUpload}) {
    const [image, setImage] = useState()
    const uploadImage = async () => {
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.images],
            });
           
            setImage(res.uri)
            onUpload({uri:res.uri, name:res.name, type: res.type})
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
        // const res=await ImagePicker.launchImageLibrary(
        //     {
        //         mediaType: 'photo',
        //         includeBase64: false,
        //         maxHeight: 500,
        //         maxWidth: 500,
        //         quality: 0.5
        //     },
        //     async (response) => {
        //         console.log("redpo",response);
        //         if(response?.didCancel) return
        //         setImage(response.uri)
        //         onUpload({uri:response.uri.toString(), name: response.fileName, type: response.type})
        //         return response.uri
        //     },
        // )
    }
    return (
        <TouchableRipple onPress={uploadImage} duration={800} style={styles.container}>
            {image ?
                <Image source={{uri:image}} resizeMode="cover" style={{height:scale(150),width:"100%"}}/>
            :
            <Text style={styles.text}>{label||"Upload Document"}</Text>

            }

        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:appColors.gray,
        height:scale(150),
        marginHorizontal:scale(20),
        marginVertical:scale(10),
        borderRadius:scale(10),
        justifyContent:"center",
        alignItems:"center",
        overflow:"hidden"
        
    },
    text:{
        color:appColors.white,
        fontSize:scale(16),
        fontFamily:"JosefinSans-Medium"
    }
})
