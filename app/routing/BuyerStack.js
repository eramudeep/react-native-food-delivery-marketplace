import React from 'react'
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import Dashboard from '../screens/buyer/Dashboard';
import RestaurantDetail from '../screens/buyer/RestaurantDetail';
import Profile from '../screens/buyer/Profile';
import PlaceOrder from '../screens/buyer/PlaceOrder';
import Payment from '../screens/buyer/Payment';
import Confirmation from '../screens/buyer/PlaceOrder/Confirmation';
import ViewItem from '../screens/buyer/RestaurantDetail/ViewItem';
import Reviews from '../screens/buyer/Review';

const Stack = createStackNavigator();
export default function BuyerStack() {
    return (
      <Stack.Navigator screenOptions={{
        headerShown:false,
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
      }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
        <Stack.Screen name="ViewItem" component={ViewItem} />
        <Stack.Screen name="Reviews" component={Reviews} />
      </Stack.Navigator>
    );
}