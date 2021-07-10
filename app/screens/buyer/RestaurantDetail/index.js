import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { useDispatch, useSelector } from 'react-redux'
import readDoc from '../../../backend/firebase/readDoc'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import CustomCheck from '../../../components/CustomCheck'
import Empty from '../../../components/Empty'
import Header from '../../../components/Header'
import ShopHeader from '../../../components/Header/ShopHeader'
import SnapCarousel from '../../../components/SnapCarousel'
import ICBag from '../../../components/SVG/ICBag'
import { appColors } from '../../../utils/appColors'
import auth from '@react-native-firebase/auth'
import { AlertHelper } from '../../../utils/AlertHelper'

export default function RestaurantDetail({ navigation, route }) {
    const { item, kitchenUid } = route.params
    const { cart,cartKitchen } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [kitchenItems, setKitchenItems] = useState({})
    // console.log("cart=====?>>>>",cartKitchen);
    const getKitchenItems = async () => {
        const res = await readDoc('kitchenItems', kitchenUid)
            .then(doc => {
                setKitchenItems(doc.data())
            })
    }
    useEffect(() => {
        getKitchenItems()
    }, [])
    const onViewOrder = () => {
        if (!auth().currentUser) return AlertHelper.show("error", "Error", "Please login first before place the order")
        navigation.navigate("PlaceOrder")
    }
    return (
        <NormalContainer  >
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <ShopHeader kitchen={item} cuisine={item.cuisine} background={item.image} onBack={() => navigation.goBack()} />
                    <Text style={styles.title}>Menu Items</Text>
                    {
                        kitchenItems && Object.keys(kitchenItems).length > 0 ? Object.keys(kitchenItems).map((val, key) => {
                            const Kitem = kitchenItems[val]
                            console.log("=>>", item);
                            return (Kitem.itemName &&
                                <TouchableRipple
                                    disabled={!item.kitchenAvailability?.kitchenStatus}
                                    rippleDuration={800}
                                    key={key}
                                    style={[styles.item, !item.kitchenAvailability?.kitchenStatus && { opacity: 0.4 }]}
                                    onPress={() => navigation.navigate("ViewItem", { item: Kitem,kitchen:item })}>
                                    <View style={styles.itemView}>
                                        <View style={{ flex: 1, }}>
                                            <Text style={[styles.itemName,]}>{Kitem.itemName}</Text>
                                            <Text numberOfLines={2} style={[styles.itemName, { color: appColors.lightGray }]}>{Kitem.Description}</Text>
                                            <Text style={[styles.itemName]}>£{Kitem.price}</Text>
                                        </View>
                                        <View style={{ backgroundColor: appColors.white }}>
                                            {Kitem.image ? <SnapCarousel autoplay data={[Kitem.image]} /> :
                                                <View style={styles.noImage}>
                                                    <Text style={{ fontFamily: "JosefinSans-SemiBold" }}>No image</Text>
                                                </View>}
                                        </View>
                                    </View>
                                    {/* <View style={[styles.uploadView, styles.vari]}>
                                    {
                                        variations.map((val, key) => {
                                            return (
                                                <View key={key} style={{ flexDirection: "row" }}>
                                                    <CustomCheck />
                                                    <Text style={styles.txtVari}>{val}</Text>
                                                 </View>
                                            )
                                        })
                                    }
                                </View> */}
                                </TouchableRipple>
                            )
                        }) :
                            <Empty />
                    }
                </ScrollView>
            </View>
            {cart.length > 0 && <TouchableRipple rippleColor={appColors.white} rippleDuration={800} onPress={onViewOrder} style={[styles.container]}>
                <View style={[styles.btnInner, styles.center]}>
                    <ICBag size={scale(25)} />
                    <View style={styles.badge}>
                        <Text style={styles.badgeTxt}>{cart.length}</Text>
                    </View>
                </View>
                <Text style={styles.label}>VIEW ORDER</Text>
                <View style={[styles.btnInner, styles.center]}>
                    <Text style={styles.txtPrice}></Text>
                </View>
            </TouchableRipple>}
        </NormalContainer>
    )
}
const styles = StyleSheet.create({
    item: {
        marginBottom: scale(1),
        backgroundColor: appColors.white,

        borderBottomWidth: 1,
        borderBottomColor: appColors.borderColor

    },
    title: {
        fontFamily: "JosefinSans-Bold",
        fontSize: scale(20),
        paddingHorizontal: scale(20),
        marginBottom: scale(10)
    },
    badge: {
        height: scale(20),
        width: scale(20),
        borderRadius: scale(10),
        backgroundColor: appColors.red,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: scale(20)
    },
    badgeTxt: {
        color: appColors.white,
        fontFamily: "JosefinSans-SemiBold"
    },
    btnInner: {
        width: scale(80),
        height: scale(40)
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
        paddingVertical: scale(5),

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
    },
    container: {
        height: scale(50),
        backgroundColor: appColors.secondaryColor,
        borderRadius: scale(10),
        margin: scale(10),
        paddingHorizontal: scale(10),
        flexDirection: "row",
        alignItems: "center"
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    label: {
        color: appColors.white,
        fontSize: scale(14),
        fontFamily: "JosefinSans-Regular",
        flex: 1,
        textAlign: "center"
    },
    txtPrice: {
        color: appColors.white,
        fontSize: scale(12),
        fontFamily: "JosefinSans-Regular",
        textAlign: "center"
    },
    noImage: {
        height: scale(80),
        width: scale(80),
        backgroundColor: appColors.borderColor,
        justifyContent: "center",
        alignItems: "center"
    },
})
