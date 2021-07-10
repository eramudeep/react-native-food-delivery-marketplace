import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { useDispatch, useSelector } from 'react-redux'
import { chargeAPI } from '../../../APIS/ApiURL'
import { getFcm } from '../../../backend/firebase/getFCM'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import InputField from '../../../components/CustomInput/InputField'
import Header from '../../../components/Header'
import LoadingModal from '../../../components/Modals/LoadingModal'
import { createCardToken } from '../../../components/stripePayment'
import ICChecked from '../../../components/SVG/ICChecked'
import ICCircle from '../../../components/SVG/ICCircle'
import { sendPushNotification } from '../../../notification/sendPush'
import { placeOrder } from '../../../redux/actions'
import { AlertHelper } from '../../../utils/AlertHelper'
import { appColors } from '../../../utils/appColors'
import { numOnly } from '../../../utils/CONSTANTS'
import postRequestData from '../../../utils/postRequestData'
const paymentType = ["DEBIT CARD", "CREDIT CARD",]
// import stripe from 'react-native-stripe-payments';
// import stripe from 'tipsi-stripe'
export default function Payment({ navigation, route }) {
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cart)
    const [selectType, setSelectType] = useState(0)
    const [checked, setChecked] = useState(false)
    const [card, setCard] = useState("4242424242424242")
    const [expMonth, setExpMonth] = useState("02")
    const [expYear, setExpYear] = useState("23")
    const [cvc, setCvc] = useState("111")
    const [isLoading, setIsLoading] = useState(false)

    const { price, kitchen } = route.params
    console.log("kitcheb",kitchen);
    console.log(price);
    const onPay = () => {
        if (!cart || cart.length < 1) return navigation.navigate("Dashboard")
        // if(!card.match(numOnly)) return AlertHelper.show("error","Error",`Please enter correct card number`)
        stripePay()
    }
    const stripePay = async () => {
        setIsLoading(true)
        const res = await createCardToken(card, parseInt(expMonth), parseInt(expYear), cvc)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error);
            });
        console.log("respoene srtrype", res);
            if(res.error) {
                setIsLoading(false)
                return AlertHelper.show("error","Error",res.error.message)
            }

        const respo = await postRequestData(chargeAPI, { amount: price, stripeToken: res.id, stripeAccountId: "acct_1IUockRHIIkA8VBK" }).catch(res => console.log("errr", res))
        setIsLoading(false)
        // console.log("paymet", respo.json());
        let final =  await respo.json()
        
        if (final?.status == 200) {
            dispatch(placeOrder({ items: cart, price, kitchen, paymentDetails: final }))
            AlertHelper.show("success", "Success", "Your order has been placed.")
            const fcmTok=await getFcm(kitchen.uid)
            console.log("token is",fcmTok);
            if(fcmTok){
                await sendPushNotification(fcmTok,"Order","You have receive a new order request")
            }
            navigation.navigate("Dashboard")
            // navigation.navigate("Reviews", { kitchen })
        }
        else {
            AlertHelper.show("error", "Error", "Payment Failed")
            setIsLoading(false)
        }
        // stripe.setOptions({ publishingKey: 'pk_test_51IDUnGIu5WYQsn65LWO7hfGCIiOelgLGNdECwEDNWmHcQEQeeXoFIailraeVpOAHSojpJkhCQtxXpxzNiB6EGzLd00v1lmEB4G' });
        // const isCardValid = stripe.isCardValid({
        //     number: card,
        //     expMonth:parseInt(expMonth),
        //     expYear: parseInt(expYear),
        //     cvc: cvc,
        //   });
        //   console.log("tokne",isCardValid);
        //   if(!isCardValid)  return AlertHelper.show("error","Error","Please enter valid card details")
        //   const cardDetails = {
        //     number: card,
        //     expMonth:parseInt(expMonth),
        //     expYear: parseInt(expYear),
        //     cvc: cvc,
        //   }
        //   try {
        //     stripe.confirmPayment('sk_test_51IDUnGIu5WYQsn65VM5FKIr1PuIdkAodZzE4fk0uCNIUp7PFRQxY8oCw04SKry6IBonHAgEe6zMFfA3iiu4cOOed00dyZ6mLGI', cardDetails)
        //     .then(result => {
        //       // result of type PaymentResult
        //       console.log("resutlt",result);
        //     })
        //     .catch(err =>{
        //         console.log("stripe error",err);
        //     }
        //       // error performing payment
        //     ) 
        //   } catch (error) {
        //       console.log("error",error);
        //   } 
        // dispatch(placeOrder({items:cart,price,kitchen}))
        // AlertHelper.show("success","Success","Your order has been placed.")
        //   navigation.navigate("Reviews",{kitchen})
    }

    return (
        <NormalContainer header={<Header showBack title={"Select Payment Type"} onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} titleColor={appColors.thirdColor} containerStyle={{ backgroundColor: appColors.white }} />}>
            <View style={styles.topView}>
                {
                    paymentType.map((val, key) => {
                        return (
                            <TouchableRipple key={key} onPress={() => setSelectType(key)} rippleColor={appColors.white} style={[styles.type, styles.center, styles.shadow, { backgroundColor: selectType == key ? appColors.secondaryColor : appColors.white }]}>
                                <Text style={[styles.txtType, { color: selectType == key ? appColors.white : appColors.black }]}>{val}</Text>
                            </TouchableRipple>
                        )
                    })
                }
            </View>
            {
                selectType == 2 ?
                    <View >
                        <InputField placeholder={"Paypal Email"} />
                        <InputField placeholder={"Paypal Password"} />

                    </View> :
                    <View >
                        <InputField maxLength={16} placeholder={"Card Number"} keyboardType={"number-pad"} onChangeText={val => setCard(val)} />
                        <View style={{ flexDirection: "row", }}>
                            <InputField maxLength={2} placeholder={"MM"} onChangeText={val => setExpMonth(val)} style={{ paddingHorizontal: 10, width: 80, alignItems: "center" }} keyboardType={"number-pad"} inputStyle={{ fontSize: scale(12), paddingHorizontal: 5, textAlign: "center" }} />
                            <InputField maxLength={2} placeholder={"YY"} onChangeText={val => setExpYear(val)} style={{ paddingHorizontal: 10, width: 80, alignItems: "center", marginHorizontal: scale(0) }} keyboardType={"number-pad"} inputStyle={{ fontSize: scale(12), textAlign: "center", paddingHorizontal: 5 }} />
                            {/* <InputField placeholder={"YY"} style={{}} keyboardType={"number-pad"} inputStyle={{fontSize:scale(12)}}/> */}
                            <InputField maxLength={3} placeholder={"CVV"} onChangeText={val => setCvc(val)} style={{ flex: 2, paddingHorizontal: 10 }} keyboardType={"number-pad"} inputStyle={{ fontSize: scale(12), textAlign: "center" }} />
                        </View>
                    </View>
            }
            <View style={[styles.bottom,]}>
                <TouchableRipple
                    rippleColor={appColors.white}
                    style={styles.btnChecked}
                    onPress={() => setChecked(!checked)}>
                    {checked ?
                        <ICChecked size={scale(20)} />
                        :
                        <ICCircle size={scale(20)} />
                    }
                </TouchableRipple>
                <Text style={styles.Txtaccpt}>Save card details for future use</Text>
            </View>
            <LoadingModal visible={isLoading}/>
            <CustomButton label={"PAY"} onPress={onPay} />
        </NormalContainer>
    )
}

const styles = StyleSheet.create({
    topView: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(20),
        justifyContent: "center"
    },
    type: {
        height: scale(35),
        // width: scale(100),
        flex:1,
        backgroundColor: appColors.secondaryColor,
        borderRadius: scale(5),
        marginVertical: scale(10),
        marginHorizontal: scale(2)
    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    txtType: {
        fontFamily: "JosefinSans-Regular",
        color: appColors.white,
        fontSize: scale(12)
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
    bottom: {
        margin: scale(20),
        flexDirection: "row",
    },
    btnChecked: {
        borderRadius: scale(10),
        overflow: "hidden",
    },
    Txtaccpt: {
        color: appColors.forthColor,
        fontFamily: "JosefinSans-Medium",
        paddingHorizontal: scale(10),
        fontSize: scale(14)
    },
})
