import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity,BackHandler,Alert } from 'react-native'
import { scale } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../../components/Container'
import CustomButton from '../../components/CustomButton'
import { getKitchenList, setAccountMode } from '../../redux/actions'
import { AlertHelper } from '../../utils/AlertHelper'
import { appColors } from '../../utils/appColors'
import getIcon from '../../utils/getIcon'

export default function Welcome({ navigation }) {
    const {  userData } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const setMode=(mode)=>{
        if(Object.keys(userData).length < 1 && mode==='seller'){
            return AlertHelper.show("error","Error","You need to Login first for selling food")
        }
        dispatch(setAccountMode({accountType:mode}))
        dispatch(getKitchenList())
        navigation.navigate("BottomTab",{screen:"Home"})
    }
    const backAction = () => {
        if (navigation.isFocused()) {
          return true;
        }
      };
    
      useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', backAction);
      }, []);
    return (
        <Container bg={getIcon("img3")}>
            <View style={[{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: scale(20), marginBottom: scale(80) }]}>
                <Text style={styles.title}>Hello,{'\n'}Welcome to {'\n'}<Text style={{ color: appColors.yellow }}>Meal Empire</Text></Text>
                <CustomButton label={"I want food"} buttonStyle={{ marginTop: scale(60) }} onPress={() => setMode("buyer")}  />
                <CustomButton label={"I'm selling food"} buttonStyle={{ marginTop: scale(0) }} onPress={() => setMode("seller")} />
            </View>
        </Container>
    ) 
}

const styles = StyleSheet.create({
    center: {
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: appColors.white,
        fontSize: scale(25),
        // textAlign:"center",
        letterSpacing: 1, lineHeight: scale(35),
        fontFamily: 'JosefinSans-SemiBold',
        // fontWeight:"bold"
    },
    forgot: {
        color: appColors.white,
        textAlign: "right",
        paddingHorizontal: scale(20)
    },
    txtCreate: {
        color: appColors.white,
        textAlign: "center",
        borderBottomWidth: 0.5,
        marginBottom: scale(20),
        borderBottomColor: appColors.white,
        paddingBottom: scale(5)
    }
})
