/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MainStack from './app/routing/MainStack';
import { Provider } from "react-redux"
import store from './app/redux/store';
import { SafeAreaView, StatusBar, LogBox} from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { AlertHelper } from './app/utils/AlertHelper';
import PlacesAutocomplete from './app/components/MapView/PlacesAutocomplete';
import Confirmation from './app/screens/buyer/PlaceOrder/Confirmation';
import PlacesInput from './app/components/MapView/CustomPlacesAutocomplete';
import Messaging from './app/notification/Messaging';

const App: () => React$Node = () => {
  // return(
  //   <>
  //   <PlacesInput googleApiKey="AIzaSyAefnV7MLP6LDSWiItD5-Axfdpiowy2Ug0" key="AIzaSyAefnV7MLP6LDSWiItD5-Axfdpiowy2Ug0"/>
  //   {/* <PlacesAutocomplete/> */}
  //   </>
  // )

  return (
    <Provider store={store}>
      <StatusBar hidden />
      <SafeAreaView style={{ flex: 1 }}>
        <MainStack />
        <DropdownAlert
          defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row',zIndex:100 }}
          ref={ref => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
        <Messaging/>
      </SafeAreaView>
    </Provider>
  )
};


export default App;
