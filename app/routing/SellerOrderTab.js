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
import SellerOrders from '../screens/buyer/Orders/SellerOrders';
import SellerPastOrder from '../screens/buyer/Orders/SellerPastOrder';

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
            <Tab.Screen name="orders received" component={SellerOrders} />
            <Tab.Screen name="orders Delivered" component={SellerPastOrder} />
        </Tab.Navigator>
    )
}
export default function SellerOrderTab({ navigation }) {
    return (
        <>
        <Text style={{backgroundColor:appColors.white,paddingVertical:scale(10),textAlign:"center",fontSize:scale(16),fontFamily:"JosefinSans-Bold"}}>Seller Mode</Text>
        <TabNav />
        </>
    );
}