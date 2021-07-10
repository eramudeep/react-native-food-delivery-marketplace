import React, { Component, useState } from "react";
import { Text, View, Image, Dimensions,StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import Carousel, { Pagination } from "react-native-snap-carousel";
// import FastImage from "react-native-fast-image";
// const { width, height } = Dimensions.get("window");
import { appColors } from "../../utils/appColors";
const entries = [
    "https://www.spendwithpennies.com/wp-content/uploads/2020/01/Italian-Sub-Sandwich-SpendWithPennies-8-500x500.jpg",
    "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/300x300/exps23238_TH10524D41C.jpg",
    "https://i.pinimg.com/236x/43/f5/5f/43f55fedff3171ea51ae57f9cdaa7b96--deli-sandwiches-cold-deli-sandwich-ideas.jpg"
]
export default function SnapCarousel({autoplay,width,height,data}) {
    const [activeSlide, setActiveSlide] = useState(0)
    const _renderItem = ({ item, index }) => {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: appColors.black,
                    alignItems: "center",
                    justifyContent: "center"
                }}
                key={index}
            >
                <Image
                    source={{ uri: item }}
                    style={{ width:width|| scale(80), height:height|| scale(80) }}
                    resizeMode="cover"
                     //{FastImage.resizeMode.contain}
                />
            </View>
        );
    };
 
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop={true}
                autoplay={autoplay}
                layout={"stack"}
                data={data||entries}
                renderItem={_renderItem}
                sliderWidth={width||scale(80)}
                itemWidth={width||scale(80)}
                inactiveSlideOpacity={1}
                onSnapToItem={index => setActiveSlide(index)}
            />
            <View style={styles.absolute} >
            <Pagination
                dotsLength={data?data.length:entries.length}
                activeDotIndex={activeSlide}
                containerStyle={{ backgroundColor: "transparent",paddingVertical: 8 }}
                dotStyle={styles.dotStyle}
                inactiveDotStyle={
                    {
                        // Define styles for inactive dots here
                    }
                }
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
                {/* <Text>dfdf</Text> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    absolute:{
    position: "absolute",
    bottom: 0,
    flex: 1,
    right: 0,
    left: 0
},
dotStyle:{
    width: 8,
    height: 8,
    borderRadius: 4,
    // marginHorizontal: 8,
    backgroundColor: appColors.white
},
})
