import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
// import Header from '../../../components/header'
import { scale } from 'react-native-size-matters'
// import { StyleColor } from '../../../utils/StyleGuide'
// import getIcon from '../../../utils/getIcons'
import NormalContainer from '../../../components/Container/NormalContainer'
import getIcon from '../../../utils/getIcon'
import { appColors } from '../../../utils/appColors'
import CustomButton from '../../../components/CustomButton'
import Header from '../../../components/Header'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useDispatch } from 'react-redux'
import { setKitchenRating } from '../../../redux/actions'
import { AlertHelper } from '../../../utils/AlertHelper'

export default function Reviews({ navigation,route }) {
    const{kitchen}=route.params
    const dispatch = useDispatch()
    const [ratingCo, setRatingCo] = useState(1)
   const ratingCompleted=(rating)=> {
        console.log("Rating is:dsdd" + kitchen)
        setRatingCo(rating)
      }
      const onDone=()=>{
          dispatch(setKitchenRating({rating:ratingCo,kitchenId:kitchen.uid}))
          AlertHelper.show("success","Success","Thank you for rating")
        navigation.navigate("Dashboard")
      }
    return (
        <NormalContainer style={styles.container}
            header={<Header backColor={appColors.thirdColor} onBack={() => navigation.goBack()} title={"Restaurant Rating"} titleColor={appColors.thirdColor} />}
        >
            {/* <Header showPower showTitle title="Reviews and Ratings" showBack /> */}
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.innerView}>

                        <View style={{ alignItems: 'center', marginBottom: scale(20) }}>
                            {/* <Image source={getIcon("stars")} resizeMode={"center"} style={styles.stars} /> */}
                            <Rating
                                showRating
                                type="custom"
                                ratingTextColor={appColors.thirdColor}
                                minValue={1}
                                // imageSize={50}
                                ratingBackgroundColor={appColors.borderColor}
                                onFinishRating={ratingCompleted}
                                style={{ paddingVertical: 10,borderColor:appColors.secondaryColor }}
                            />
                            <Text style={[styles.fontMedium, styles.txtTitle]}>
                                Rate your experience
                       </Text>
                        </View>
                    </View>
                    {/*<View style={styles.innerView}>
                         <Text style={[styles.fontMedium, styles.txtTitle]}>
                            REVIEWS
                       </Text> 
                        <View style={styles.textView}>
                            <TextInput
                                placeholder={"Write your experience"}
                                multiline={true}

                                style={{ fontFamily: "JosefinSans-Regular", color: appColors.forthColor }}
                            />
                        </View>
                    </View>*/}

                </View>
            </ScrollView>
            <CustomButton label={"Done"} onPress={onDone} />
            {/* <TouchableOpacity style={styles.btn} >
                    <Text style={[styles.fontBold,]}>SUBMIT</Text>
                </TouchableOpacity> */}
        </NormalContainer >
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fontMedium: {
        fontFamily: 'JosefinSans-Medium'
    },
    fontBold: { fontFamily: 'JosefinSans-Bold' },
    txtTitle: {
        fontSize: scale(16),
        color: appColors.lightGray,
        marginBottom: scale(10)
    },
    innerView: {
        marginTop: scale(15),
        paddingHorizontal: scale(10)
    },
    textView: {
        borderRadius: scale(5),
        borderWidth: scale(0.5),
        borderColor: appColors.black,
        height: scale(100), backgroundColor: appColors.white
    },
    stars: {
        height: scale(40), width: scale(130)
    },

})
