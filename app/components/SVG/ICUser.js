import * as React from "react"
import Svg, { G, Circle, Rect } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function ICUser({height,width,color}) {
  return (
    <Svg width={width} height={height} viewBox="0 0 40.062 56.413">
    <G
      data-name="Group 316"
      transform="translate(2.519 3.081)"
      // fill={color||"#fff"}
      stroke={color||"#fff"}
      strokeMiterlimit={10}
    > 
      <Circle
        data-name="Ellipse 34"
        cx={10.378}
        cy={10.378}
        transform="translate(7.135)"
        strokeWidth={4}
        r={10.378}
      />
      <Rect
        data-name="Rectangle 113"
        width={35.025}
        height={21.95}
        rx={10.975}
        transform="translate(0 28.863)"
        strokeWidth={4}
      />
    </G>
  </Svg>
  )
}

export default ICUser
