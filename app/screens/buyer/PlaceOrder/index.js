import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import Empty from '../../../components/Empty'
import Header from '../../../components/Header'
import CustomNumberStepper from '../../../components/NumberStepper'
import SnapCarousel from '../../../components/SnapCarousel'
import { addToCart } from '../../../redux/actions'
import { appColors } from '../../../utils/appColors'
import { cartSetter, valueFinder } from '../../../utils/cartSetter'

export default function PlaceOrder({ navigation,route }) {
    const [subtotal, setSubtotal] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [deliveryCost, setDeliveryCost] = useState(2.49)
    const [serviceFee, setServiceFee] = useState(3.00)
    const [vat, setVat] = useState(0.63)
    const dispatch = useDispatch()
    const { cart,cartKitchen } = useSelector(state => state.cart)
    const addItem=(value,data)=>{
        // console.log("item =",value);
        const cartRes=cartSetter({cart,value,data})    
        console.log("add to cart respo",cartRes);    
            dispatch(addToCart({cartRes,kitchen:cartKitchen}))
        // navigation.goBack(null)
    }
console.log("+++",cartKitchen);
    useEffect(() => {
        let total=0
        for(let val in cart){
           total+= cart[val].value*cart[val].data.price
        }
        console.log(total);
        setSubtotal(total)
        let final=total+deliveryCost+serviceFee+vat
        final=final.toFixed(2)
        setTotalPrice(final)
    }, [cart])
    if(cart.length<1){
        return(
            <NormalContainer style={{ backgroundColor: "#f1f1f1" }} header={<Header showBack title={"Your Order"} onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} titleColor={appColors.thirdColor} containerStyle={{ backgroundColor: appColors.white }} />}>
                <Empty/>
            </NormalContainer>
        )
    }
    return (
        <NormalContainer style={{ backgroundColor: "#f1f1f1" }} header={<Header showBack title={`${cartKitchen?.kitchenName}`} onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} titleColor={appColors.thirdColor} containerStyle={{ backgroundColor: appColors.white }} />}>
            <View style={styles.body}>
                <ScrollView>
                    {
                        cart.map((val, key) => {
                            // console.log("val", val);
                            let itemCount=valueFinder(val.data,cart)
                            console.log("item count",itemCount);
                            let itemTotal=val.data.price*itemCount
                            
                            return (
                                <View key={key} style={[styles.itemView, styles.shadow]}>
                                    <Text style={styles.itemTitle}>
                                        {val.data.itemName}({val.data.foodType})
                                    </Text>
                                    <View style={{ flexDirection: "row", marginTop: scale(10) }}>
                                        {/* <Text style={[styles.itemTitle, { fontSize: scale(14) }]}>{ }</Text> */}
                                        <View style={{ flex: 1, marginLeft: scale(10) }}>
                                            {/* <Text style={[styles.itemTitle, { fontSize: scale(14) }]}>
                                                {val.data.Description}
                                            </Text> */}
                                            <View style={{ marginTop: scale(5), flexDirection: "row", flexWrap: "wrap" }}>
                                                {val.data.variation && val.data.variation.map((value, key) => {
                                                    return (
                                                        <Text key={key} style={styles.subItem}>
                                                            • {value}
                                                        </Text>
                                                    )
                                                })}
                                                {/*                                                 
                                                <Text style={styles.subItem}>
                                                    • 2 Lrg Premimum Roast Brewed Coffee [5.0 Cals]
                                                </Text> */}
                                            </View>
                                        </View>
                                        {/* <View style={{}}>
                                            {val.data.image ? <SnapCarousel autoplay data={[val.data.image]} /> :
                                                <View style={styles.noImage}>
                                                    <Text style={{ fontFamily: "JosefinSans-SemiBold" }}>No image</Text>
                                                </View>}
                                        </View> */}
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: scale(10) }}>
                                        <View style={{ width: scale(100), }}>
                                            <CustomNumberStepper
                                                maxValue={20}
                                                initialValue={itemCount}
                                                autoRepeat={false}
                                                buttonsWidth={30}
                                                buttonHeight={30}
                                                buttonsBackgroundColor={appColors.secondaryColor}
                                                labelBackgroundColor={"#f5f7e5"}
                                                labelFontColor={appColors.forthColor}
                                            onValueChange={(value) => addItem(value, val.data)}
                                            />
                                        </View>
                                        <Text style={[styles.itemTitle, { fontSize: scale(16),color:appColors.black }]}>£{itemTotal.toFixed(2)}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <View style={{ paddingHorizontal: scale(20), backgroundColor: "#f1f1f1" }}>
                <View style={styles.txtTotal}>
                    <Text style={styles.labelTotal}>Subtotal</Text>
                    <Text style={styles.labelTotal}>£{subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.txtTotal}>
                    <Text style={styles.labelTotal}>Delivery Fee</Text>
                    <Text style={styles.labelTotal}>£2.49</Text>
                </View>
                <View style={styles.txtTotal}>
                    <Text style={styles.labelTotal}>Service Fee</Text>
                    <Text style={styles.labelTotal}>£3.00</Text>
                </View>
                {/* <View style={styles.txtTotal}>
                    <Text style={styles.labelTotal}>VAT</Text>
                    <Text style={styles.labelTotal}>£0.63</Text>
                </View> */}
                <View style={[styles.txtTotal, styles.viewTotal]}>
                    <Text style={styles.labelTotal}>Total</Text>
                    <Text style={[styles.labelTotal, { fontFamily: "JosefinSans-Bold", fontSize: scale(16) }]}>£{totalPrice}</Text>
                </View>
                <CustomButton label={"CHECKOUT"} buttonStyle={{ marginHorizontal: 0,marginVertical:5 }} onPress={() => navigation.navigate("Payment",{price:totalPrice,kitchen:cartKitchen})} />
            </View>
        </NormalContainer>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        // paddingHorizontal: scale(20),
        // marginTop: scale(20)
    },
    itemView: {
        // borderBottomColor: appColors.black, 
        // borderBottomWidth: 1,
        paddingBottom: scale(5),
        backgroundColor: appColors.white,
        marginVertical: scale(5),
        paddingHorizontal: scale(20),
    },
    itemTitle: {
        fontFamily: "JosefinSans-SemiBold",
        fontSize: scale(17),
    },
    subItem: {
        fontFamily: "JosefinSans-Regular",
        color: appColors.gray, marginRight: scale(5)
    },
    txtTotal: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: scale(5),

    },
    viewTotal: {
        borderTopWidth: scale(1),
        borderTopColor: appColors.borderColor,
        paddingTop: scale(20),
    },
    labelTotal: {
        fontSize: scale(14),
        fontFamily: "JosefinSans-Regular"
    },
    price: {
        fontSize: scale(14),
        fontFamily: "JosefinSans-Regular"
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
    noImage: {
        height: scale(80),
        width: scale(80),
        backgroundColor: appColors.borderColor,
        justifyContent: "center",
        alignItems: "center"
    },

})
