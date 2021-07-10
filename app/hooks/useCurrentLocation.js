import React, {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

export default function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    const unsub = readLocation();
    /* console.log("unsub",unsub);
    return unsub; */
  }, []);
  const readLocation = () => {
    return Geolocation.getCurrentPosition(onSuccess, onError);
  };
  const onSuccess = (info) => {
    setCurrentLocation({
      lat: info.coords.latitude,
      lng: info.coords.longitude,
    });
  };
  const onError = (err) => {
    console.log('err', err);
  };
  return currentLocation;
}
