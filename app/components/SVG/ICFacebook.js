import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ICFacebook({size}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      <Path
        d="M384 176h-96v-64c0-17.664 14.336-32 32-32h32V0h-64c-53.024 0-96 42.976-96 96v80h-64v80h64v256h96V256h64l32-80z"
        fill="#1976d2"
      />
    </Svg>
  )
}

export default ICFacebook