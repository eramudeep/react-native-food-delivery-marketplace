import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { scale } from 'react-native-size-matters';
import { appColors, shadow } from '../../utils/appColors';
import ICClose from '../SVG/ICClose';
import TouchableRipple from 'react-native-touch-ripple';
import ICNext from '../SVG/ICNext';
import ICShop from '../SVG/ICShop';
import ICFood from '../SVG/ICFood';

export default function MapViewComponent({ location,kitchens,navigation }) {
  const [myLoc, setMyLoc] = useState()
  const [showKitchen, setShowKitchen] = useState(false)
  const [targetKitchenCallout, setTargetKitchenCallout] = useState()
 
  useEffect(() => {
   
    Geolocation.getCurrentPosition(info =>{
      
      setMyLoc({latitude :info.coords.latitude,longitude :info.coords.longitude})
    } );
  }, [])
  const onDetilsClick = (kitchen) => {
    setShowKitchen(false)
    navigation.navigate("RestaurantDetail", { item:kitchen, kitchenUid: kitchen.uid })
  };
  return ( 
    <>
    <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      style={styles.map}
      showsMyLocationButton={true}
      showsUserLocation={true}
      region={{
        latitude: location && location.lat || myLoc && myLoc.latitude ||37.78825,
        longitude: location && location.lng ||myLoc  && myLoc.longitude ||-122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
      customMapStyle={mapStyle}
    >
      {/* {myLoc &&<Marker
        coordinate={myLoc}
        title={"You are here"}
        // description={marker.description}
      />} */}
      {kitchens&& kitchens.map((value,key)=>{
        return Object.keys(value).map((val,key)=>{
          const item = value[val]
          if(item?.location)
          return <Marker key={key}
          coordinate={item.location}
          title={item.kitchenName}
          onPress={() => {
            setShowKitchen(true)
            setTargetKitchenCallout(item)
          }}
          // style={{backgroundColor:"red"}}
          // description={marker.description}
        >
          <ICFood size={50}/>
        </Marker>
        })      
      })}
    </MapView>
    {showKitchen && (
            <KitchenDetailsCallOut
              onDetilsClick={onDetilsClick}
              kitchen={targetKitchenCallout}
              hideCallOut={()=>{setShowKitchen(false)}}
            />
          )}
    </>
  )
}
const KitchenDetailsCallOut = ({kitchen, hideCallOut, onDetilsClick}) => {
  const {
    address,
    kitchenName,
    image,
    uid,
  } = kitchen;

  return (
    <View style={styles.callOutContainer}>
      {/*TITLE AND IMAGE */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          
          {image ? <Image source={image ? { uri: image } : getIcon("")} resizeMode={"cover"} style={styles.image} /> : <View style={[styles.image, styles.center]}><Text style={styles.shopTxt}>No Image</Text></View>}
          <Text style={{fontSize: scale(16),fontFamily: "JosefinSans-Medium",marginHorizontal:scale(5)}}> {kitchenName.toUpperCase()}</Text>
        </View>
        <TouchableRipple
          onPress={hideCallOut && hideCallOut}
          // rippleColor={StyleGuide.primary}
          rippleContainerBorderRadius={scale(15)}
          rippleDuration={600}
          style={{
            backgroundColor: appColors.gray,
            // padding: scale(9),
            borderRadius: scale(15),top:-scale(15)
          }}>
          <ICClose
            size={scale(20)}
            // fill={StyleGuide.white}
          />
        </TouchableRipple>
      </View>

      {/*ADDRESS */}
      <View
        style={{
          marginTop: scale(10),
          marginBottom: scale(10),
          borderBottomColor: appColors.lightGray,
          borderBottomWidth: scale(0.2),
          padding: scale(10),
        }}>
        <Text style={{color: appColors.gray, fontSize: scale(10),fontFamily: "JosefinSans-Bold",}}>
          Address
        </Text>
        <Text style={{color: appColors.thirdColor,fontFamily: "JosefinSans-Regular",}}>{address}</Text>
      </View>


      <TouchableRipple
        onPress={() => {
          onDetilsClick && onDetilsClick(kitchen);
        }}
        // rippleColor={StyleGuide.primary}
        rippleContainerBorderRadius={scale(15)}
        rippleDuration={600}
        style={{
          //width: '60%',
          backgroundColor: appColors.white,
          flexDirection: 'row',
          marginTop: scale(10),
          alignItems: 'center',
          paddingHorizontal: scale(10),
          borderRadius: scale(25),
          padding: scale(5),
          justifyContent: 'center',
        }}>
        <Text style={{letterSpacing: scale(3),fontFamily: "JosefinSans-Regular",}}>VIEW DETAILS</Text>
        <View
          style={{
            marginLeft: scale(10),
            backgroundColor: appColors.secondaryColor,
            borderRadius: scale(25),
            padding: scale(10),
          }}>
          <ICNext
            size={scale(10)}
            color={appColors.white}
            // width={scale(10)}
            // fill={StyleGuide.white}
          />
        </View>
      </TouchableRipple>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  callOutContainer: {
    backgroundColor: appColors.borderColor,
    padding: scale(10),
    borderRadius: scale(10),
    ...shadow

  },
  center: {
    alignItems: "center",
    justifyContent: "center"
},
shopTxt: {
  fontFamily: "JosefinSans-Bold",
  fontSize: scale(12),
  marginTop: scale(5),

},
image: {
  height: scale(50),
  width: scale(50),
  borderRadius: scale(5),
  backgroundColor: appColors.lightGray,
},
})
const mapStyle = [
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
]