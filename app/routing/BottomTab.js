import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Profile from '../screens/buyer/Profile';
import BuyerStack from './BuyerStack';
import SellerStack from './SellerStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottomTab from '../components/CustomBottomTab';
import { useSelector } from 'react-redux';
import OrderTab from './OrderTab';
import SellerOrderTab from './SellerOrderTab';
import Loading from '../components/Loading';
import PlaceOrder from '../screens/buyer/PlaceOrder';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
    const {accountType} = useSelector(state => state.auth)
    // console.log("account Type==-==??>>",accountType);
  if(accountType)return (
        <Tab.Navigator
        tabBar={props => <CustomBottomTab {...props} />}
        
        >
          <Tab.Screen name="Home" 
          component={accountType==="seller"?SellerStack:BuyerStack} 
           
          />
          <Tab.Screen name="order" component={accountType==="seller"?SellerOrderTab:OrderTab}
          />
          
          <Tab.Screen name="profile" component={Profile} 
         />
         {/* {accountType==="buyer"&& <Tab.Screen name="PlaceOrder" component={PlaceOrder} 
         
         />} */}
        </Tab.Navigator>
      );
      else{
        return(
          <Loading/>
        )
      }
}

const styles = StyleSheet.create({})
