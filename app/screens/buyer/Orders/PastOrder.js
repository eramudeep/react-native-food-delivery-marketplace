import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import CustomCheck from '../../../components/CustomCheck'
import Empty from '../../../components/Empty'
import Header from '../../../components/Header'
import ShopHeader from '../../../components/Header/ShopHeader'
import SnapCarousel from '../../../components/SnapCarousel'
import ICBag from '../../../components/SVG/ICBag'
import ICClose from '../../../components/SVG/ICClose'
import { appColors } from '../../../utils/appColors'

const variations = ["Halal", "Contain Nuts", "Egg Free", "Veg"]
export default function PastOrder({ navigation }) {

    return (
        <NormalContainer  >
            <View style={{flex:1}}>
                <ScrollView>
            {
                [].map((val,key)=>{
                    return(
                        <View  key={key} style={styles.item}>
                                <View style={styles.itemView}>
                                    <View style={{flex:1}}>
                                        <Text style={[styles.itemName,]}>ORDER NO: 2580</Text>                                          
                                        <Text style={[styles.itemName,]}>8" Hungry Man Sub (291g)</Text>
                                        <Text numberOfLines={2} style={[styles.itemName,{color:appColors.lightGray}]}>Item Description and others</Text>
                    <Text  style={[styles.itemName,{color:appColors.lightGray}]}>Delevered on:{new Date().toLocaleTimeString()}</Text>
                                        <Text style={[styles.itemName,]}>£6.50</Text>
                                    </View>
                                    <View style={{ backgroundColor: appColors.white ,height:scale(80),width:scale(80)}}>
                                        <SnapCarousel autoplay/>
                                    </View>
                                </View>
                                
                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                                {/* <ICClose size={scale(26)}/> */}
                                <Text style={styles.txtCancel}>DELIVERED</Text>
                                </View>
                                
                            </View>
                    )
                })
            }
            <Empty message={"No previous order here"}/>
            </ScrollView>
            </View>
            
        </NormalContainer>
    )
}
const styles = StyleSheet.create({
    item:{ 
         marginBottom: scale(1),
         backgroundColor:appColors.white,
         
        borderBottomWidth:1,
        borderBottomColor:appColors.borderColor
         
    },
    title:{
        fontFamily: "JosefinSans-Bold",
        fontSize:scale(20),
        paddingHorizontal:scale(20),
        marginBottom:scale(10)
    },
    txtCancel:{
        fontSize:scale(16),
        fontFamily:"JosefinSans-Regular",
        marginBottom:scale(3)
},
    badge:{
            height:scale(20),
            width:scale(20),
            borderRadius:scale(10),
            backgroundColor:appColors.red,
            alignItems:"center",
            justifyContent:"center",
            position:"absolute",
            right:scale(20)
    },
    badgeTxt:{
        color:appColors.white,
        fontFamily: "JosefinSans-SemiBold"
    },
    btnInner:{
        width:scale(80),
        height:scale(40)
},
    itemName: {
        flex:1,
        flexWrap: "wrap",
        marginVertical: scale(2),
        fontFamily: "JosefinSans-SemiBold"
    },
    uploadView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: scale(20),
        marginTop: scale(10),
        alignItems: "center"
    },
    vari: {
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: scale(10)
    },
    img: {
        height: scale(80),
        width: scale(80),
        // backgroundColor: "red"
    },
    txtVari: {
        paddingHorizontal: scale(5),
        fontFamily: "JosefinSans-SemiBold",
    },
    itemView: {
        flexDirection: "row",
        paddingHorizontal: scale(20),
        paddingVertical:scale(5),
        
    },
    rowBack: {
        // alignItems: 'center',
        backgroundColor: appColors.black22,
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-end",
        // paddingLeft: 15,
        borderBottomColor: appColors.black22,
         borderBottomWidth: scale(1), 
        paddingBottom:scale(1)
    },
    edit:{
        backgroundColor:appColors.red,
        alignItems:"center",
        justifyContent:"center",
        width:scale(80)
        // flex:1
    },
    deleteTxt:{
        fontFamily:"JosefinSans-SemiBold",
        color:appColors.white
    },
    container:{
        height:scale(50),
        backgroundColor:appColors.secondaryColor,
        borderRadius:scale(10),
        margin:scale(10),
        paddingHorizontal:scale(10),
        flexDirection:"row",
        alignItems:"center"
    },
    center:{
        alignItems:"center",
        justifyContent:"center"
    },
    label:{
        color:appColors.white,
        fontSize:scale(14),
        fontFamily:"JosefinSans-Regular",
        flex:1,
        textAlign:"center"
    },
    txtPrice:{
        color:appColors.white,
        fontSize:scale(12),
        fontFamily:"JosefinSans-Regular",
        textAlign:"center"
    }
})
