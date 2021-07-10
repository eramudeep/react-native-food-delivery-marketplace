import * as React from "react"
import Svg, { G, Circle, Rect } from "react-native-svg"
import { appColors } from "../../utils/appColors"

function ICUserFilled({width,height,color}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 40.062 56.413">
      <G
        data-name="Group 316"
        transform="translate(2.519 3.081)"
        fill={color||appColors.secondaryColor}
        stroke={color||appColors.secondaryColor}
        strokeMiterlimit={10}
      >
        <Circle
          data-name="Ellipse 34"
          cx={10.378}
          cy={10.378}
          transform="translate(7.135)"
          strokeWidth={6.163}
          r={10.378}
        />
        <Rect
          data-name="Rectangle 113"
          width={35.025}
          height={21.95}
          rx={10.975}
          transform="translate(0 28.863)"
          strokeWidth={5.037}
        />
      </G>
    </Svg>
  )
}

export default ICUserFilled