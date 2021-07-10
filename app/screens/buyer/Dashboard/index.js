import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  RefreshControl,
  BackHandler, 
  Alert
} from 'react-native';
// import {  } from 'react-native-gesture-handler'
import { scale } from 'react-native-size-matters';
import TouchableRipple from 'react-native-touch-ripple';
import NormalContainer from '../../../components/Container/NormalContainer';
import InputField from '../../../components/CustomInput/InputField';
import ICMenu from '../../../components/SVG/ICMenu';
import ICMap from '../../../components/SVG/ICMap';
import ICSearch from '../../../components/SVG/ICSearch';
import { appColors } from '../../../utils/appColors';
import getIcon from '../../../utils/getIcon';
import { useDispatch, useSelector } from 'react-redux';
import MapView from '../../../components/MapView';
import PlacesAutocomplete from '../../../components/MapView/PlacesAutocomplete';
import { getKitchenList } from '../../../redux/actions';
import Empty from '../../../components/Empty';
import ICCart from '../../../components/SVG/ICCart'
import useCurrentLocation from '../../../hooks/useCurrentLocation';
import useOrders from '../../../hooks/useOrders';
const delivery = ['delivery', 'pickup'];
const { width, height } = Dimensions.get('window');
export default function Dashboard({ navigation, route }) {
  const currentLocation = useCurrentLocation()
  
  console.log("currentLocation",currentLocation);
  const { kitchenList } = useSelector((state) => state.kitchen);
  const { cart,cartKitchen } = useSelector(state => state.cart)
  const [selectType, setSelectType] = useState('delivery');
  const [mapView, setmapView] = useState(true);
  const [location, setLocation] = useState();
  const [searchAddress, setSearchAddress] = useState();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getKitchenList({ location: location ? location : currentLocation }));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const orders=useOrders({userId:"GDrSD4vE7CQjwr0I5eKP9Gm7mTL2",callBack:callBackForOrders})
  const callBackForOrders= ()=>{
    console.log("I AM BEING CALLED FROM HOOK");
  }

  useEffect(() => {
    dispatch(getKitchenList({ location: currentLocation }));
  }, [currentLocation]);
  const getRatings = (item) => {
    let rating = 0
    const ratingCount = item?.ratings?.length;
    item?.ratings?.map((val) => {
      rating = rating + val;
    });
    rating = rating / ratingCount;
    return isNaN(rating) ? 0 : rating
  };
  const backAction = () => {
    if (navigation.isFocused()) {
        Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
    }
};

useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
}, []);
  return (
    <NormalContainer>
      <View style={styles.topView}>
        <View style={{ flexDirection: 'row' }}>
          {delivery?.map((val, key) => {
            return (
              <TouchableRipple
                key={key}
                onPress={() => setSelectType(val)}
                rippleColor={appColors.white}
                style={[styles.type, styles.center]}>
                <Text
                  style={[
                    styles.txtType,
                    {
                      color:
                        selectType == val
                          ? appColors.secondaryColor
                          : appColors.black,
                    },
                  ]}>
                  {val.toUpperCase()}
                </Text>
              </TouchableRipple>
            );
          })}
          
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("PlaceOrder")} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}} style={{marginRight:scale(4)}}>
                    <ICCart size={scale(30)}/>
                    {cart?.length>0 && <View style={styles.badge}>
                        <Text style={styles.badgeTxt}>{cart.length}</Text>
                    </View>}
                </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: scale(20),
        }}>
        <PlacesAutocomplete
          value={searchAddress}
          onChangeText={(val) => setSearchAddress(val)}
          onPress={(data, details = null) => {
            setLocation(details.geometry.location);
            setSearchAddress(details.formatted_address);
            dispatch(getKitchenList({ location: details.geometry.location }));
          }}
          style={{ flex: 1, marginHorizontal: 0 }}
          icon={<ICSearch size={scale(20)} />}
          placeholder={'Search'}
        />
        <TouchableOpacity
          style={{ marginTop: scale(15) }}
          onPress={() => setmapView((prevState) => !prevState)}>
          {!mapView ? <ICMap size={scale(30)} /> : <ICMenu size={scale(30)} />}
        </TouchableOpacity>
      </View>
      {mapView ? (
        <View style={[styles.body, styles.center]}>
          <MapView
            location={location}
            kitchens={kitchenList && kitchenList}
            navigation={navigation}
          />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={[styles.listBody]}>
            {kitchenList &&
              kitchenList.map((item, key) => {
                const { distance, kitchenId } = item;
                let rating = 0;
                return (
                  <TouchableOpacity
                    style={[styles.card, styles.shadow]}
                    activeOpacity={0.6}
                    key={key}
                    onPress={() =>
                      navigation.navigate('RestaurantDetail', {
                        item,
                        kitchenUid: kitchenId,
                      })
                    }>
                    {item.image ? (
                      <Image
                        source={item.image ? { uri: item.image } : getIcon('')}
                        resizeMode={'cover'}
                        style={styles.image}
                      />
                    ) : (
                      <View style={[styles.image, styles.center]}>
                        <Text style={styles.shopTxt}>No Image</Text>
                      </View>
                    )}
                    <View style={{ paddingHorizontal: scale(10) }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: scale(10),
                        }}>
                        <Text style={styles.shopTxt}>{item.kitchenName}</Text>
                        <View style={styles.ratingBagde}>
                          <Text style={styles.ratingText}>
                            {getRatings(item)?.toFixed(1)}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.shopdes}>
                        Available - {item.cuisine}
                      </Text>
                      <Text style={styles.shopdes}>{item.address}</Text>
                      <Text
                        style={[
                          styles.shopTxt,
                          { fontSize: scale(12), marginBottom: scale(10) },
                        ]}>
                        {distance ? `${distance} Miles.` : ''} Delivery Cost. £5
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      )}
    </NormalContainer>
  );
}

const styles = StyleSheet.create({
  ratingBagde: {
    backgroundColor: appColors.secondaryColor,
    height: scale(30),
    borderRadius: scale(10),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(10)
  },
  ratingText: {
    fontFamily: "JosefinSans-Bold",
    color: appColors.white,
    fontSize: scale(14)
  },
  topView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(20),
    justifyContent: "space-between", paddingTop: scale(10)
  },
  type: {
    // height: scale(35),
    // width: scale(100),
    // backgroundColor: appColors.secondaryColor,
    // borderRadius: scale(5),
    // marginVertical: scale(10),
    // marginHorizontal:scale(2)
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  txtType: {
    fontFamily: "JosefinSans-Bold",
    color: appColors.white,
    fontSize: scale(16),
    // marginTop: scale(20),
    marginHorizontal: scale(3)
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  body: {
    flex: 1,
    backgroundColor: appColors.black22,
    margin: scale(10)
  },
  listBody: {
    flex: 1,
    margin: scale(10),
    overflow: "hidden"
  },
  shopTxt: {
    fontFamily: "JosefinSans-Bold",
    fontSize: scale(16),
    marginTop: scale(5),

  },
  shopdes: {
    fontFamily: "JosefinSans-Regular",
    fontSize: scale(12),
    marginTop: scale(5),
    color: appColors.gray
  },
  card: {
    backgroundColor: appColors.lightBorder,
    marginBottom: scale(10),
    borderRadius: scale(15),
    overflow: "hidden"
  },
  image: {
    height: scale(120),
    width: width - scale(20),
    borderRadius: scale(5),
    backgroundColor: appColors.lightGray,
  },
  badge: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    backgroundColor: appColors.red,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: scale(20)
  },
  badgeTxt: {
    color: appColors.white,
    fontFamily: "JosefinSans-SemiBold"
  },
})
