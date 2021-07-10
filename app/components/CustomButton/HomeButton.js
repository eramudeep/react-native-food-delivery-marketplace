import React from 'react'
import { ImageBackground, StyleSheet, Text, View,Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { AlertHelper } from '../../utils/AlertHelper'
import { appColors } from '../../utils/appColors'
import getIcon from '../../utils/getIcon'
const { width, height } = Dimensions.get("window")
const images=[getIcon("img5"),getIcon("img2"),getIcon("img3"),getIcon("img4"),getIcon("img1"),]
const startColor=['rgba(255,86,115,0.8)','rgba(131,43,246,0.8)','rgba(45,206,248,0.8)','rgba(0,57,197,0.8)','rgba(255,135,14,0.8)']
const endColor=['rgba(255,140,72,0.8)','rgba(255,70,101,0.8)','rgba(59,64,254,0.8)','rgba(33,229,144,0.8)','rgba(210,54,210,0.8)']
export default function HomeButton({buttons,navigation,data}) {
    const onCard=(route,disable)=>{
        if(disable){
            AlertHelper.show('error',"Error","Please add kitchen first")
        }
        else{
            navigation.navigate(route)
        }
    }
    return (
                <View style={styles.innerView}>
                  {  buttons.map((val,key)=>{
                      let label=val.label
                      let disable=false
                      if(key==0){
                          if(data){
                              label="Edit Kitchen"
                          }
                      }
                      else{
                        disable=!data
                      }
                  return(
                    <ImageBackground key={key} source={images[key]} style={[styles.card, styles.shadow]}>
                    <LinearGradient colors={[disable?appColors.borderColor :startColor[key],disable?appColors.borderColor: endColor[key]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                        <TouchableRipple  rippleColor={appColors.white} onPress={()=>onCard(val.route,disable)} style={[styles.card, styles.center,{margin:0},]}>
                  <Text style={styles.label}>{label}</Text>
                        </TouchableRipple>
                    </LinearGradient>
                </ImageBackground>
                  )
                })}
                </View>
    )
}

const styles = StyleSheet.create({
    innerView: {
        flex: 1,
        // flexWrap: "wrap",
        // flexDirection: "row",
        // justifyContent: "space-around",
        paddingHorizontal:scale(20),
        paddingVertical:scale(20),
        
    },
    card: {
        height:  scale(100),
        // width: width  - scale(30),
        // backgroundColor: appColors.white,
        borderRadius: scale(10),
        margin: scale(5),
        overflow:"hidden"
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    label:{
        color:appColors.white,
        fontFamily:"JosefinSans-Bold",
        fontSize:scale(20),
        textAlign:"center"
    }
})
