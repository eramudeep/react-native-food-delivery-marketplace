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
import Orders from '../screens/buyer/Orders';
import PastOrder from '../screens/buyer/Orders/PastOrder';
import { Text } from 'react-native';

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
            <Tab.Screen name="current orders" component={Orders} />
            <Tab.Screen name="Previous orders" component={PastOrder} />
        </Tab.Navigator>
    )
}
export default function OrderTab({ navigation }) {
    return (
        <>
        <Text style={{backgroundColor:appColors.white,paddingVertical:scale(10),textAlign:"center",fontSize:scale(16),fontFamily:"JosefinSans-Bold"}}>Buyer Mode</Text>
        <TabNav />
        </>
    );
}