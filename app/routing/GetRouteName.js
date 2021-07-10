import {useRoute} from '@react-navigation/native';
import React, { Component, useEffect } from 'react'

// useEffect(() => {
//     console.log(route.name);
    
// }, [route.name])
export default function GetRouteName() {
    const route = useRoute();
    return route.name
    
}
