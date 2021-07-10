import * as React from "react"
import Svg, { LinearGradient, Stop, Path, Circle } from "react-native-svg"

function ICInstagram({size}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 551.034 551.034">
      <LinearGradient
        id="prefix__a"
        gradientUnits="userSpaceOnUse"
        x1={275.517}
        y1={4.57}
        x2={275.517}
        y2={549.72}
        gradientTransform="matrix(1 0 0 -1 0 554)"
      >
        <Stop offset={0} stopColor="#e09b3d" />
        <Stop offset={0.3} stopColor="#c74c4d" />
        <Stop offset={0.6} stopColor="#c21975" />
        <Stop offset={1} stopColor="#7024c4" />
      </LinearGradient>
      <Path
        d="M386.878 0H164.156C73.64 0 0 73.64 0 164.156v222.722c0 90.516 73.64 164.156 164.156 164.156h222.722c90.516 0 164.156-73.64 164.156-164.156V164.156C551.033 73.64 477.393 0 386.878 0zM495.6 386.878c0 60.045-48.677 108.722-108.722 108.722H164.156c-60.045 0-108.722-48.677-108.722-108.722V164.156c0-60.046 48.677-108.722 108.722-108.722h222.722c60.045 0 108.722 48.676 108.722 108.722v222.722z"
        fill="url(#prefix__a)"
      />
      <LinearGradient
        id="prefix__b"
        gradientUnits="userSpaceOnUse"
        x1={275.517}
        y1={4.57}
        x2={275.517}
        y2={549.72}
        gradientTransform="matrix(1 0 0 -1 0 554)"
      >
        <Stop offset={0} stopColor="#e09b3d" />
        <Stop offset={0.3} stopColor="#c74c4d" />
        <Stop offset={0.6} stopColor="#c21975" />
        <Stop offset={1} stopColor="#7024c4" />
      </LinearGradient>
      <Path
        d="M275.517 133C196.933 133 133 196.933 133 275.516s63.933 142.517 142.517 142.517S418.034 354.1 418.034 275.516 354.101 133 275.517 133zm0 229.6c-48.095 0-87.083-38.988-87.083-87.083s38.989-87.083 87.083-87.083c48.095 0 87.083 38.988 87.083 87.083 0 48.094-38.989 87.083-87.083 87.083z"
        fill="url(#prefix__b)"
      />
      <LinearGradient
        id="prefix__c"
        gradientUnits="userSpaceOnUse"
        x1={418.31}
        y1={4.57}
        x2={418.31}
        y2={549.72}
        gradientTransform="matrix(1 0 0 -1 0 554)"
      >
        <Stop offset={0} stopColor="#e09b3d" />
        <Stop offset={0.3} stopColor="#c74c4d" />
        <Stop offset={0.6} stopColor="#c21975" />
        <Stop offset={1} stopColor="#7024c4" />
      </LinearGradient>
      <Circle cx={418.31} cy={134.07} r={34.15} fill="url(#prefix__c)" />
    </Svg>
  )
}

export default ICInstagram