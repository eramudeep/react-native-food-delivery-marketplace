import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'
import ICHome from '../SVG/ICHome'
import ICList from '../SVG/ICList'
import ICUser from '../SVG/ICUser'
import { useRoute, useNavigation } from '@react-navigation/native';
import { getActiveRouteName } from '../../routing/MainStack'
import ICHomeFilled from '../SVG/ICHomeFilled'
import ICListFilled from '../SVG/ICListFilled'
import ICUserFilled from '../SVG/ICUserFilled'
import ICCart from '../SVG/ICCart'
import ICCartFilled from '../SVG/ICCartFilled'
const inActiveIcons = [<ICHome size={scale(25)} />, <ICList size={scale(25)} />, <ICUser width={scale(25)} height={scale(25)} color={appColors.voiletLight} />,<ICCart size={scale(25)} color={appColors.voiletLight}/>]
const activeIcons = [<ICHomeFilled size={scale(25)} />, <ICListFilled size={scale(25)} />, <ICUserFilled width={scale(25)} height={scale(25)} />,<ICCartFilled size={scale(25)}/>]
export default function CustomBottomTab({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const Icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon : null
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableRipple
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            rippleCentered rippleDuration={800} style={styles.touch}>

            {isFocused ? activeIcons[index] : inActiveIcons[index]}
          </TouchableRipple>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.white,
    height: scale(60),
    borderTopStartRadius: scale(25),
    borderTopEndRadius: scale(25),
    flexDirection: "row",
    // alignItems:"center",
    justifyContent: "space-around",
    shadowColor: "#000",
    borderColor: appColors.lightBorder,
    borderWidth: 0.5,
  },
  touch: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
})
