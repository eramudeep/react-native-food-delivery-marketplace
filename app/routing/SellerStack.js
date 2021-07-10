import React from 'react'
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import CreateKitchen from '../screens/seller/Kitchen';
import KitchenAvailablity from '../screens/seller/Kitchen/KitchenAvailablity';
import AddItem from '../screens/seller/Kitchen/AddItem';
import PreviewItems from '../screens/seller/Kitchen/PreviewItems';
import BankTab from './BankTab';
import SavedMessage from '../screens/seller/Kitchen/SavedMessage';
import Home from '../screens/seller/Home';
import EditProfile from '../screens/Login/EditProfile';
import BankDetails from '../screens/seller/Payment/BankDetails';
import UploadDocuments from '../screens/seller/Payment/UploadDocuments';

const Stack = createStackNavigator();
export default function SellerStack() {
    return (
      <Stack.Navigator screenOptions={{
        headerShown:false,
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
        
      }}>
              

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateKitchen" component={CreateKitchen} />
        <Stack.Screen name="KitchenAvailablity" component={KitchenAvailablity} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="PreviewItems" component={PreviewItems} />
        <Stack.Screen name="BankTab" component={BankDetails} />
        <Stack.Screen name="SavedMessage" component={SavedMessage} />
        <Stack.Screen name="UploadDocuments" component={UploadDocuments} />
        
      </Stack.Navigator>
    );
}

