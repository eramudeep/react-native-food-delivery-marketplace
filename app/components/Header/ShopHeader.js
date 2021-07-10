import React from 'react'
import { ImageBackground, StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import { scale } from 'react-native-size-matters'
import Header from '.'
import { appColors } from '../../utils/appColors'
import getIcon from '../../utils/getIcon'
import { BlurView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient'
import ICCall from '../SVG/ICCall'
const { width, height } = Dimensions.get("window")
export default function ShopHeader({ background, rating, showBack, onBack, cuisine, kitchen }) {
    
    const currentDay = new Date().getDay()
    let time = kitchen.kitchenAvailability?.kitchenAvailable[currentDay]
    if (kitchen.kitchenAvailability && !kitchen.kitchenAvailability.kitchenStatus) {
        time = kitchen.kitchenAvailability.kitchenAvailable[currentDay + 1]
    }
    return (
        <View>
            <ImageBackground source={background ? { uri: background } : getIcon()} style={{ width: width, height: scale(250), flex: 1 }}>
                <LinearGradient colors={["rgba(0,0,0,0.5)", "transparent"]} style={styles.innerView} >
                    <Header showBack onBack={onBack} />
                    {/* <View style={[styles.blurBg,styles.center]}>
                        <BlurView
                            style={[styles.blurBg, styles.absolute]}
                            //   viewRef={this.state.viewRef}
                            blurType="light"
                            blurAmount={3}
                            blurRadius={20}
                            reducedTransparencyFallbackColor="blue"
                        />
                        <View style={styles.callIcon}>
                                <ICCall size={scale(15)}/>
                        </View>
                        <Text style={styles.txtPhone}>+91 8744 145 002</Text>
                    </View> */}

                </LinearGradient>
            </ImageBackground>
            <View style={{ padding: scale(20) }}>
                <View style={styles.viewTitle}>
                    <Text style={styles.label}>{kitchen.kitchenName}</Text>
                    {cuisine && <LinearGradient colors={["rgb(255,86,115)", "rgb(255,140,72)"]} style={{ borderRadius: scale(20), marginHorizontal: scale(5) }}>
                        <Text style={styles.badge}>{kitchen.cuisine}</Text>
                    </LinearGradient>}
                    <View style={styles.badgeKm}>
                        <Text style={styles.badge}>{kitchen?.distance} miles</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.txtAddress}>{kitchen.address}</Text>
                    <Text style={[styles.txtAddress, { color: kitchen.kitchenAvailability?.kitchenStatus ? appColors.green : appColors.red }]}>
                        {kitchen.kitchenAvailability?.kitchenStatus ? "Open Now " : "Closed "}
                        <Text style={{ color: appColors.lightGray }}>
                            { kitchen.kitchenAvailability?.kitchenStatus ? "today time " : "Open tommorow "}
                        </Text>
                        <Text style={{ color: appColors.red }}>{`${time?.open||0} ${time?.open<12?"am":"pm"}` || ''} to {`${time?.close||0} ${time?.close<12?"am":"pm"}`}
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    blurBg: {
        height: scale(45),
        borderRadius: scale(45 / 2),
        overflow: "hidden",
        backgroundColor: "transparent",
        paddingHorizontal: scale(20)
    },
    innerView: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center", paddingBottom: scale(20)
    },
    txtPhone: {
        fontFamily: "JosefinSans-SemiBold",
        color: appColors.white,
        fontSize: scale(14),
        paddingLeft: scale(10)
    },
    label: {
        fontFamily: "JosefinSans-Bold",
        color: appColors.thirdColor,
        fontSize: scale(20)
    },
    callIcon: {
        height: scale(30),
        width: scale(30),
        backgroundColor: appColors.white,
        borderRadius: scale(15),
        justifyContent: "center",
        alignItems: 'center'
    },
    absolute: {
        position: "absolute",
        // top: 0,
        left: 1,
        bottom: 0,
        right: 1
    },
    badge: {
        fontFamily: "JosefinSans-Regular",
        color: appColors.white,
        fontSize: scale(10),
        padding: scale(5),
        paddingHorizontal: scale(10)

    },
    viewTitle: {
        flexDirection: "row",
        alignItems: "center"
    },
    badgeKm: {
        borderRadius: scale(20),
        backgroundColor: appColors.secondaryColor,
    },
    txtAddress: {
        fontFamily: "JosefinSans-Regular",
        color: appColors.lightGray,
        fontSize: scale(14)
    },
    center: {
        alignItems: "center",
        flexDirection: "row"
    }
})
