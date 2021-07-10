import * as React from "react"
import Svg, { G, Rect, Path, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function ICMail({width,height}) {
  return (
    <Svg width={width|| 60} height={height|| 49} viewBox="0 0 60 49">
    <G
      data-name="Group 333"
      transform="translate(-215 -145)"
      fill="none"
      stroke="#fff"
      strokeMiterlimit={10}
    >
      <Rect
        data-name="Rectangle 213"
        width={56}
        height={45}
        rx={9.149}
        transform="translate(217 147)"
        strokeWidth={4}
      />
      <Path
        data-name="Path 427"
        d="M221 150l20.618 20.618a4.783 4.783 0 006.764 0L269 150"
        strokeWidth={4.753}
      />
    </G>
  </Svg>
  )
}

export default ICMail
