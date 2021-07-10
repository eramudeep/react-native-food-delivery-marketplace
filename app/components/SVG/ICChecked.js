import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"
import { appColors } from "../../utils/appColors"

function ICChecked({size}) {
  return (
    <Svg width={size|| 65.999} height={size || 65.999} viewBox="0 0 65.999 65.999">
      <G data-name="Group 324" transform="translate(-991.001 -510.001)">
        <Circle
          data-name="Ellipse 55"
          cx={33}
          cy={33}
          r={33}
          transform="translate(991.001 510.001)"
          fill={appColors.secondaryColor}
        />
        <G
          data-name="Group 323"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth={5}
        >
          <Path data-name="Line 3" d="M1036.807 534.199l-18.27 18.27" />
          <Path data-name="Line 4" d="M1011.133 545.36l7.27 7.115" />
        </G>
      </G>
    </Svg>
  )
}

export default ICChecked