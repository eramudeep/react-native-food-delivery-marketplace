import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions,Alert,BackHandler} from 'react-native'
import { scale } from 'react-native-size-matters'
import NormalContainer from '../../components/Container/NormalContainer'
import { appColors } from '../../utils/appColors'
import HomeButton from '../../components/CustomButton/HomeButton'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import ProfileButton from '../../components/CustomButton/ProfileButton'
import { AlertHelper } from '../../utils/AlertHelper'
const { width, height } = Dimensions.get("window")
const buttons=[
    {
        label:"Create Kitchen",
        route:"CreateKitchen",
    },
    {
        label:"Kitchen Availability",
        route:"KitchenAvailablity",
    },
    {
        label:"Add Item",
        route:"AddItem",
    },
    {
        label:"Items List",
        route:"PreviewItems",
    },
    {
        label:"Payments",
        route:"BankTab",
    },
]

export default function Home({navigation}) {
    const { kitchenDetail } = useSelector(state => state.kitchen)
    const onCard=(route,disable)=>{
        if(disable){
            AlertHelper.show('error',"Error","Please add kitchen first")
        }
        else{
            navigation.navigate(route)
        }
    }
    const backAction = () => {
        if (navigation.isFocused()) {
          Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        }
      };
    
      useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', backAction);
      }, []);
    return (
        <NormalContainer header={<Header  title={"Menu"} onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} titleColor={appColors.thirdColor}  onUser={()=>navigation.navigate("EditProfile")} />}>
            <ScrollView>
                <View style={styles.innerView}>
                <View style={styles.title}>
                    {/* <ICLoading size={100}/> */}
                    <Text style={styles.label}>Kitchen Menu</Text>
                </View>
                    {buttons.map((val,key)=>{
                         let label=val.label
                         let disable=false
                         let data=Object.keys(kitchenDetail).length
                         if(key==0){
                             if(data){
                                 label="Edit Kitchen"
                             }
                         }
                         else{
                           disable=!data
                         }
                        return(
                            <ProfileButton key={key} label={label}  onPress={()=>onCard(val.route,disable)} style={[ {height:scale(60)},disable&&{backgroundColor:appColors.lightBorder,opacity:0.5}]}/>
                        )
                    })}
                    {/* <HomeButton buttons={buttons} navigation={navigation} data={kitchenDetail && Object.keys(kitchenDetail).length}/> */}
                </View>
            </ScrollView>
        </NormalContainer>
    )
}

const styles = StyleSheet.create({
    innerView: {
        flex: 1,
        // marginTop:scale(20)
    },
    card: {
        height: width / 2 - scale(30),
        width: width / 2 - scale(30),
        // backgroundColor: appColors.white,
        borderRadius: scale(10),
        // padding: scale(5),
        overflow:"hidden"
    },
    imageBg:{
        height: width / 2 - scale(30),
        width: width / 2 - scale(30),
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
    title: {
        height: scale(50),
        backgroundColor: appColors.secondaryColor5,
        paddingHorizontal: scale(20),
        justifyContent: "center"
    },
    label: {
        // flex:1,
        color: appColors.forthColor,
        fontFamily: 'JosefinSans-SemiBold',
        fontSize: scale(16)

    },
})
