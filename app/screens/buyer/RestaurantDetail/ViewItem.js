import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { useDispatch, useSelector } from 'react-redux'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import CustomCheck from '../../../components/CustomCheck'
import Header from '../../../components/Header'
import CustomNumberStepper from '../../../components/NumberStepper'
import SnapCarousel from '../../../components/SnapCarousel'
import ICClose from '../../../components/SVG/ICClose'
import { addToCart } from '../../../redux/actions'
import { appColors } from '../../../utils/appColors'
import { cartSetter } from '../../../utils/cartSetter'
const { width, height } = Dimensions.get("window");
const variations = ["Halal", "Contain Nuts", "Egg Free", "Veg"]
const dummy = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. "
export default function ViewItem({ navigation,route }) {
    const{item,kitchen}=route.params
    const dispatch = useDispatch()
    const {cart} = useSelector(state => state.cart)
const addItem=()=>{
    // console.log("item =",item);
    const cartRes=cartSetter({cart,value:1,data:item})    
    // console.log("add to cart respo",cartRes);    
        dispatch(addToCart({cartRes,kitchen}))
    navigation.goBack(null)
}
    return (
        <NormalContainer>
            <LinearGradient colors={[appColors.black22, "transparent", "transparent"]} style={{ flex: 1, position: "absolute", width: width, zIndex: 2, height: scale(250) }}>
                <View style={styles.header}>

                    <TouchableRipple onPress={()=>navigation.goBack(null)}>
                        <ICClose size={scale(30)} color={appColors.white} />
                    </TouchableRipple>
                    <Text style={styles.headerTitle}>{item.itemName}</Text>

                </View>
            </LinearGradient>
            <View style={{ height: scale(250) }} >
            {item.image ? <SnapCarousel autoplay width={width} height={scale(250)} data={[item.image]} /> :
                                                <View style={styles.noImage}>
                                                    <Text style={{ fontFamily: "JosefinSans-SemiBold" }}>No image</Text>
                                                </View>}
                
            </View>
            <View style={{ paddingHorizontal: scale(20), }}>
                <Text style={styles.description}>{item.Description}</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {
                        item.variation.map((val, key) => {
                            return (
                                <View key={key} style={{ flexDirection: "row", width: width / 2 - scale(40) }}>
                                    <CustomCheck checked/>
                                    <Text style={styles.txtVari}>{val}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                {/* <CustomNumberStepper
                    maxValue={20}
                    initialValue={3}
                    autoRepeat={false}
                    buttonsWidth={30}
                    buttonHeight={30}
                    
                    buttonsBackgroundColor={appColors.secondaryColor}
                    labelBackgroundColor={"#f5f7e5"}
                    labelFontColor={appColors.forthColor}
                // onValueChange={(value) => addItem(value, data)}
                /> */}
            </View>
            
            <CustomButton label={"Add to Cart"} onPress={addItem}/>
        </NormalContainer>
    )
}

const styles = StyleSheet.create({
    header: {
        height: scale(20),
        position: "absolute",
        width: width,
        top: 10, zIndex: 1,
        flexDirection: "row",
        left: 10
    },
    headerTitle: {
        fontFamily: "JosefinSans-Bold",
        fontSize: scale(16),
        color: appColors.white,
        textAlign: 'center',
        paddingLeft: scale(30)

    },
    txtVari: {
        paddingHorizontal: scale(5),
        fontFamily: "JosefinSans-SemiBold",
    },
    description: {
        textAlign: "left",
        fontFamily: "JosefinSans-Regular",
        marginVertical: scale(10),
        fontSize: scale(14),
        borderBottomWidth: 1,
        borderBottomColor: appColors.borderColor,
        paddingBottom: scale(5)
    },
    noImage: {
        height: scale(250),
        width: width,
        backgroundColor: appColors.borderColor,
        justifyContent: "center",
        alignItems: "center"
    },
})
