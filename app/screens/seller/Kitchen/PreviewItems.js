import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { scale } from 'react-native-size-matters'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import CustomCheck from '../../../components/CustomCheck'
import Header from '../../../components/Header'
import SnapCarousel from '../../../components/SnapCarousel'
import { appColors } from '../../../utils/appColors'
import { SwipeListView } from 'react-native-swipe-list-view';
import TouchableRipple from 'react-native-touch-ripple'
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux'
import ICDelete from '../../../components/SVG/ICDelete'
import ICEdit from '../../../components/SVG/ICEdit'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import { deleteItem } from '../../../redux/actions'
import { AlertHelper } from '../../../utils/AlertHelper'
import Empty from '../../../components/Empty'

const variations = ["Halal", "Contain Nuts", "Egg Free", "Veg"]
export default function PreviewItems({ navigation }) {
    const { kitchenItems } = useSelector(state => state.kitchen)
    const [modalVisible, setModalVisible] = useState(false)
    const [itemToDelete, setItemToDelete] = useState()
    const dispatch = useDispatch()
    const onDelete=()=>{
        dispatch(deleteItem({orderId:itemToDelete}))
        AlertHelper.show("success","Success","Item delete successfully")
        toggleModal()
    }
    const toggleModal=(orderId)=>{
        if(orderId){
            setItemToDelete(orderId)
        }
        setModalVisible(prev=>!prev)
    }
    return (
        <NormalContainer header={<Header showBack title={"Preview Items"} onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} titleColor={appColors.thirdColor} />}>
            <ScrollView>
                {
                  kitchenItems && Object.keys(kitchenItems).length>0?  Object.keys(kitchenItems).map((val, key) => {
                        
                        const item = kitchenItems[val]
                        if (!item.itemName) return null
                        let num=item.price
                        return (
                            <Animatable.View key={key} style={styles.item}>
                                    <View style={[styles.itemView,{paddingVertical:0,paddingTop:scale(5)}]}>
                                    <Text style={[styles.itemName,{flex:1}]}>{item.itemName}({item.foodType})</Text>
                                    <View style={{ flexDirection: "row", marginBottom: scale(10), justifyContent: "space-around",width:scale(80),}}>
                                            <TouchableOpacity onPress={()=>toggleModal(val)}>
                                                <ICDelete size={scale(20)} color={appColors.red} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => navigation.navigate("AddItem", { orderId: val, item,editMode:true })}>
                                                <ICEdit size={scale(20)} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                <View style={styles.itemView}>
                                    <View style={{ flex: 1, }}>
                                       
                                        <Text style={[styles.itemName, { color: appColors.gray }]} numberOfLines={3}>{item.Description}</Text>
                                        <Text style={[styles.itemName]}>£{num}</Text>
                                    </View>
                                    <View style={{}}>
                                        {item.image?<SnapCarousel autoplay data={[item.image]} />:
                                        <View style={styles.noImage}>
                                            <Text style={{fontFamily:"JosefinSans-SemiBold"}}>No image</Text>
                                            </View>}
                                    </View>
                                </View>
                                <View style={[styles.vari]}>
                                    {
                                        item.variation && item.variation.map((val, key) => {
                                            return (
                                                <View key={key} style={{ flexDirection: "row" }}>
                                                    <CustomCheck checked />
                                                    <Text style={styles.txtVari}>{val}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </Animatable.View>
                        )
                    }):
                    <Empty/>
                }
            </ScrollView>
           <ConfirmationModal visible={modalVisible} onCancel={toggleModal} onConfirm={onDelete} message={"Are you sure want to delete this item?"}/>
        </NormalContainer>
    )
}
const styles = StyleSheet.create({
    item: {
        marginBottom: scale(1),
        backgroundColor: appColors.white,
        //  minHeight:scale(150),     
        borderBottomWidth: scale(1),
        borderBottomColor: appColors.borderColor
    },
    itemName: {
        // flex:1,
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
        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent: "space-between",
        marginBottom: scale(10),
        marginHorizontal: scale(20)
    },
    img: {
        height: scale(80),
        width: scale(80),
        // backgroundColor: "red"
    },
    noImage:{
        height:scale(80),
        width:scale(80),
        backgroundColor:appColors.borderColor,
        justifyContent:"center",
        alignItems:"center"
    },
    txtVari: {
        paddingHorizontal: scale(5),
        fontFamily: "JosefinSans-SemiBold",
    },
    itemView: {
        flexDirection: "row",
        paddingHorizontal: scale(20),
        paddingVertical: scale(5),
        // minHeight:scale(80)

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
        paddingBottom: scale(1)
    },
    edit: {
        backgroundColor: appColors.red,
        alignItems: "center",
        justifyContent: "center",
        width: scale(80)
        // flex:1
    },
    deleteTxt: {
        fontFamily: "JosefinSans-SemiBold",
        color: appColors.white
    }
})
