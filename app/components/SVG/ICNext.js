import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ICNext({size,color}) {
  return (
    <Svg width={size|| 18.661} height={size|| 33.074} viewBox="0 0 18.661 33.074">
      <Path
        data-name="Path 20"
        d="M2.829 30.246l13.832-13.63L2.829 2.828"
        fill="none"
        stroke={color||"#707070"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      />
    </Svg>
  )
}

export default ICNext