import React, { Component } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Forgot from '../screens/Login/Forgot';
import Login from '../screens/Login/Login';
import { NavigationContainer } from '@react-navigation/native';
import BankDetails from '../screens/seller/Payment/BankDetails';
import PaypalDetails from '../screens/seller/Payment/PaypalDetails';
import NormalContainer from '../components/Container/NormalContainer';
import Header from '../components/Header';
import { appColors } from '../utils/appColors';
import { scale } from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();
function TabNav() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                labelStyle: { fontSize: scale(12),fontFamily:"JosefinSans-Semi-Bold" },
                pressColor:appColors.secondaryColor,
                indicatorStyle:{backgroundColor:appColors.secondaryColor}
                // tabStyle: { width: 100 },
                // style: { backgroundColor: 'powderblue' },
            }}>
            <Tab.Screen name="Bank Details" component={BankDetails} />
            <Tab.Screen name="Paypal Details" component={PaypalDetails} />
        </Tab.Navigator>
    )
}
export default function BankTab({ navigation }) {
    return (
        <NormalContainer header={<Header showBack onBack={() => navigation.goBack()} backColor={appColors.thirdColor} touchColor={appColors.thirdColor} />}>
            <TabNav />
        </NormalContainer>
    );
}