import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { appColors } from '../../utils/appColors'

export default function NormalContainer({ children, header, scrollable,style }) {
    return (
        <View style={[{ flex: 1, backgroundColor: appColors.white },style]}>
            {header}
            { scrollable ?
                <ScrollView nestedScrollEnabled keyboardShouldPersistTaps="handled">
                    {children}
                </ScrollView> :
                children
            }
        </View>
    )
}

const styles = StyleSheet.create({})
