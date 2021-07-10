import * as React from "react"
import Svg, { G, Circle } from "react-native-svg"

function ICCircle({size}) {
  return (
    <Svg width={size|| 66} height={size || 66} viewBox="0 0 66 66">
      <G data-name="Ellipse 46"  stroke="#8a98ba" strokeWidth={3}>
        <Circle cx={33} cy={33} r={33} stroke="none" />
        <Circle cx={33} cy={33} r={31.5} fill="none" />
      </G>
    </Svg>
  )
}

export default ICCircle