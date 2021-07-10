import * as React from "react"
import { Image } from 'react-native'
/* SVGR has dropped some elements not supported by react-native-svg: animate */

function ICLoading({size}) {
  return (
    <Image source={require("../../assets/Images/loading1.gif")} resizeMode={"center"} style={{height:size||200,width:size||200}}/>
  )
}
export default ICLoading