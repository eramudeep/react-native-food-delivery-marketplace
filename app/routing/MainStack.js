import React from 'react'
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login/Login';
import Forgot from '../screens/Login/Forgot';
import Register from '../screens/Login/Register';
import Welcome from '../screens/Welcome';
import Terms from '../screens/seller/Terms';
import Splash from '../screens/Welcome/Splash';
import PhoneVerification from '../screens/Login/PhoneVerification';
import OtpVerification from '../screens/Login/OtpVerification';
import SellerStack from './SellerStack';
import BuyerStack from './BuyerStack';
import TermsBuyer from '../screens/seller/Terms/TermsBuyer';
import BottomTab from './BottomTab';
import EditProfile from '../screens/Login/EditProfile';
import ChangePassword from '../screens/Login/ChangePassword';

const Stack = createStackNavigator();
const routeNameRef = React.createRef();
const navigationRef = React.createRef();
export default function MainStack() {
  return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
        onStateChange={(state) => {
          if (!state) return;
          //@ts-ignore
          routeNameRef.current = getActiveRouteName(state);
        }}
      >
    <Stack.Navigator screenOptions={{
      headerShown:false,
      cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
      
    }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="TermsBuyer" component={TermsBuyer} />
      <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
      <Stack.Screen name="SellerStack" component={SellerStack} />
      <Stack.Screen name="BuyerStack" component={BuyerStack} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
export const getActiveRouteName = (state)=> {
  if (!state) return;
        const route = state.routes[state?.index || 0];

        if (route.state) {
          // Dive into nested navigators
          return getActiveRouteName(route.state);
        }

        return route.name;
    };