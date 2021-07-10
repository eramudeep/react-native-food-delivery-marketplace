import * as React from "react"
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"

function ICBack({width,height,color}) {
  return (
    <Svg width={width|| 41.102} height={height|| 74.606} viewBox="0 0 41.102 74.606">
      <Defs>
        <ClipPath id="prefix__a">
          <Path fill="none" d="M0 0h41.102v74.606H0z" />
        </ClipPath>
      </Defs>
      <G data-name="Component 5 \u2013 1" clipPath="url(#prefix__a)">
        <Path
          data-name="Path 94"
          d="M37.004 3.5L3.504 37l34.1 34.1"
          fill="none"
          stroke={color||"#222455"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={7}
        />
      </G>
    </Svg>
  )
}

export default ICBack