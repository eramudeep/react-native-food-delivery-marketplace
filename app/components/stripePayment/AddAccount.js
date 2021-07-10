import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';
import { STRIPE_URL } from '../../utils/CONSTANTS';
export default function AddAccount({onStateChange}) {
    return (
        <WebView
    source={{ uri: STRIPE_URL }}
    startInLoadingState
    scalesPageToFit
    javaScriptEnabled
    bounces={false}
    onNavigationStateChange={({ navState }) => onStateChange(navState)}
    javaScriptEnabledAndroid
/>
    )
}

const styles = StyleSheet.create({})
