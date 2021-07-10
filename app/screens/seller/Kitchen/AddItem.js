import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import NormalContainer from '../../../components/Container/NormalContainer'
import CustomButton from '../../../components/CustomButton'
import CustomCheck from '../../../components/CustomCheck'
import InputField from '../../../components/CustomInput/InputField'
import Header from '../../../components/Header'
import ICAdd from '../../../components/SVG/ICAdd'
import ICUpload from '../../../components/SVG/ICUpload'
import { appColors } from '../../../utils/appColors'
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux'
import { addItem, editItem } from '../../../redux/actions'
import { AlertHelper } from '../../../utils/AlertHelper'
import { PickImage } from '../../../utils/ImagePicker'
import ConfirmAddItemModal from '../../../components/Modals/ConfirmAddItemModal'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import getIcon from '../../../utils/getIcon'
import * as ImagePicker from 'react-native-image-picker'
import { foodType } from '../../../utils/MockData'
import ICClose from '../../../components/SVG/ICClose'

const variations = ["Halal", "Contain Nuts", "Egg Free", "Veg"]

export default function AddItem({ navigation, route }) {

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const [itemName, setItemName] = useState()
    const [Description, setDescription] = useState()
    const [foodTyp, setFoodType] = useState("Italian")
    const [price, setPrice] = useState()
    const [vari, setVari] = useState([])
    const [orderId, setOrderId] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [image, setImage] = useState()
    useEffect(() => {
        if (route.params) {
            const { orderId, item, editMode } = route.params
            setEditMode(editMode)
            setItemName(item.itemName)
            setDescription(item.Description)
            setFoodType(item.foodType)
            setPrice(item.price)
            setVari(item.variation)
            setImage(item.image)
            setOrderId(orderId)
        }
    }, [])
    const emptyChecker = () => {
        if (!itemName) return "Item Name"
        if (!Description) return "Description"
        if (!foodTyp) return "Food Type"
        if (!price) return "Price"
        // if (!image) return "Image"
    }
    const addVariation = (val) => {
        // vari
        const has = vari.find((vari) => { return vari === val; })
        if (has) {
            const index = vari.indexOf(has);
            if (index > -1) {
                vari.splice(index, 1);
            }
            // setVari(vari)
            setVari([...vari])
            return null
        }
        setVari(prevVal => [...prevVal, val])
    }

    const uploadImage = async () => {
        await ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 500,
                maxWidth: 500,
                quality: 0.5
            },
            async (response) => {
                setImage(response.uri)
                return response
            },
        )
    }
    const onAdd = (type) => {
        if (orderId) {
            dispatch(editItem({ orderId, item: { itemName, Description, foodType: foodTyp, price, variation: vari, image } }))
            AlertHelper.show("success", "Success", "Item Updated")
            toggleModal()
            navigation.goBack(null)
        }
        else {
            dispatch(addItem({ itemName, Description, foodType: foodTyp, price, variation: vari, image }))
            AlertHelper.show("success", "Success", "Item added Successfully")
        }

        toggleModal()

        if (type === "exit") {
            navigation.navigate("Home")
        }
        setItemName("")
        setDescription("")
        setFoodType("Italian")
        setPrice("")
        setVari([])
        setOrderId("")
        setImage()
    }
    const onContinue = () => {
        onAdd()
    }
    const onExit = () => {
        onAdd("exit")
    }
    const toggleModal = () => {
        const isEmpty = emptyChecker()
        if (isEmpty) return AlertHelper.show("error", "Error", `${isEmpty} is required`)
        if (editMode) return setEditModal(prev => !prev)
        setModalVisible(prev => !prev)
    }
    const checkPrice=(val)=>{
        if(val<1000){
            setPrice(ConTwoDecDigit(val))
        }
        else{
            setPrice(price)
        }
    }
  const  ConTwoDecDigit=(digit)=>{
    var reg = new RegExp(/^\d*\.?\d*$/);
    if(reg.test(digit))
    {
        return digit.indexOf(".")>0?
                digit.split(".").length>=2?
                 digit.split(".")[0]+"."+digit.split(".")[1].substring(-1,2)
                : digit
               : digit
            }
        else return ''
      }
    return (
        <NormalContainer header={<Header showBack title={editMode ? "Edit Item" : "Add Item"} onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} titleColor={appColors.thirdColor} />}>
            <View style={{ flexDirection: "row", paddingLeft: scale(20), alignItems: "center" }}>
                <Text style={styles.title}>{editMode ? "Edit Item" : "Add Item"}</Text>
            </View>
            <View style={styles.body}>
                <ScrollView> 
                    {
                        [1].map((val, key) => {
                            return (
                                <View key={key} style={{ borderBottomColor: appColors.black22, borderBottomWidth: scale(1) }}>
                                   
                                    <InputField placeholder={"Item Name"} style={styles.input} value={itemName} onChangeText={(val) => setItemName(val)} />
                                    <InputField placeholder={"Description"} maxLength={250} multiline style={styles.input} value={Description} onChangeText={(val) => setDescription(val)} />
                                    <Text style={styles.lngth}>(max length:- 250)</Text>
                                    <View style={styles.pickerView}>
                                        <RNPickerSelect
                                            pickerProps={{
                                                mode: "dropdown",

                                            }}
                                            onValueChange={(value) => setFoodType(value)}
                                            items={foodType}
                                            placeholder={{}}
                                            value={foodTyp}
                                            useNativeAndroidPickerStyle={false}
                                            style={pickerSelectStyles}
                                        />
                                    </View>
                                    <InputField   placeholder={"Price"} keyboardType={"decimal-pad"} style={styles.input} value={price} onChangeText={(val) => { checkPrice(val)}} />
                                    <View style={styles.uploadView}>
                                         <View>
                                            <Image source={{ uri: image }} resizeMode="cover" style={styles.imageStyle} />
                                            {image && <TouchableRipple style={styles.close} onPress={()=>setImage()}>
                                                <ICClose size={scale(15)}/>
                                            </TouchableRipple>}
                                        </View>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={styles.uploadTxt}>Upload Image</Text>
                                            <TouchableRipple rippleDuration={800} rippleColor={appColors.white} style={styles.addBtn} onPress={uploadImage}>
                                                <ICUpload size={scale(30)} />
                                            </TouchableRipple>
                                        </View>
                                    </View>
                                    <View style={[styles.uploadView, styles.vari]}>
                                        {
                                            variations.map((val, key) => {
                                                return (
                                                    <View key={key} style={{ flexDirection: "row" }}>
                                                        <CustomCheck checked={vari.find((vari) => { return vari === val; })} onPress={() => addVariation(val)} />
                                                        <Text style={{ paddingHorizontal: scale(5), fontFamily: "JosefinSans-SemiBold" }}>{val}</Text>
                                                    </View>

                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
            <CustomButton label={editMode ? "Save" : "Add"} onPress={toggleModal} />
            <ConfirmAddItemModal
                // message={"Please choose one of following:"}
                visible={modalVisible}
                onContinue={onContinue}
                onExit={onExit}
                onCancel={toggleModal}
            />
            <ConfirmationModal
                // message={"Are you sure want to edit this item?"}
                visible={editModal}
                onCancel={toggleModal}
                onConfirm={onContinue}
            />
        </NormalContainer>
    )
}

const styles = StyleSheet.create({
    title: {
        color: appColors.forthColor,
        fontSize: scale(14),
        fontFamily: "JosefinSans-SemiBold",
        marginVertical: scale(20),
        paddingRight: scale(20)
    },
    body: {
        flex: 1,

    },
    input: {
        marginVertical: scale(2),
        marginHorizontal: scale(10)
    },
    item: {
        fontSize: scale(16),
        fontFamily: "JosefinSans-Bold",
        paddingHorizontal: scale(10),
        marginBottom: scale(10)

    },
    addBtn: {
        height: scale(30),
        width: scale(30),
        borderRadius: scale(30 / 2),
        overflow: "hidden",
    },
    uploadTxt: {
        color: appColors.forthColor,
        fontSize: scale(14),
        fontFamily: "JosefinSans-SemiBold",
        marginRight: scale(10),
    },
    uploadView: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: scale(20),
        marginTop: scale(10),
        alignItems: "center"
    },
    vari: {
        flexWrap: "wrap",
        marginBottom: scale(10)
    },
    pickerView: {
        height: scale(45),
        //   backgroundColor: "red",
        //    width: scale(100) ,
        flex: 1,
        borderWidth: scale(1),
        borderColor: appColors.black22,
        borderRadius: scale(10),
        marginHorizontal: scale(10),
        marginVertical: scale(2)
    },
    imageStyle: {
        height: scale(50),
        width: scale(50),
        borderRadius: scale(3)
    },
    close:{
        position:"absolute",
        right:scale(-5),
        top:scale(-5),
        backgroundColor:appColors.red,
        borderRadius:scale(20),
        padding:scale(2)
    },
    lngth: {
        fontSize: scale(10),
        fontFamily: "JosefinSans-Regular",
        paddingHorizontal: scale(10),
        marginBottom: scale(10),
        textAlign:"right"

    },
})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: scale(16),
        paddingHorizontal: scale(40),
        color: appColors.forthColor,
        fontFamily: "JosefinSans-Regular",
        // flex:1
    },
    inputAndroid: {
        fontSize: scale(16),
        paddingHorizontal: scale(40),
        color: appColors.forthColor,
        fontFamily: "JosefinSans-Regular",
        // flex:1
    },
});