import * as React from "react"
import Svg, { G, Rect, Path, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function ICLock({width,height}) {
  return (
    <Svg width={width || 60} height={height || 63.936} viewBox="0 0 60 63.936">
      <G data-name="Group 331">
        <G
          data-name="Group 328"
          transform="translate(-154 -130.064)"
          fill="none"
          stroke="#fff"
          strokeMiterlimit={10}
        >
          <Rect
            data-name="Rectangle 196"
            width={56}
            height={45}
            rx={9.149}
            transform="translate(156 147)"
            strokeWidth={4}
          />
          <Path
            data-name="Rectangle 197"
            d="M177.858 132h12.284a5.858 5.858 0 015.858 5.858V147h0-24 0v-9.142a5.858 5.858 0 015.858-5.858z"
            strokeWidth={3.873}
          />
          <Circle
            data-name="Ellipse 44"
            cx={7}
            cy={7}
            r={7}
            transform="translate(177 162)"
            strokeWidth={4}
          />
        </G>
      </G>
    </Svg>
  )
}

export default ICLock
