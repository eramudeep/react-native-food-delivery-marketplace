import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { appColors } from "../../utils/appColors"

function ICHomeFilled({size}) {
  return (
    <Svg width={size|| 58.355} height={size|| 53.494} viewBox="0 0 58.355 53.494">
      <Path
        data-name="Path 84"
        d="M57.644 23.139L30.402.439a1.953 1.953 0 00-2.465 0L.695 23.139a1.953 1.953 0 00-.259 2.724 2.011 2.011 0 002.724.259l5.254-4.346V45.65c0 4.346 3.827 7.848 8.562 7.848h24.323c4.735 0 8.562-3.5 8.562-7.848V21.777l5.254 4.346a1.819 1.819 0 001.232.454 1.939 1.939 0 001.492-.713 1.837 1.837 0 00-.195-2.725zM24.626 49.473V35.85a1.911 1.911 0 011.946-1.946h5.189a1.911 1.911 0 011.946 1.946v13.621z"
        fill={appColors.secondaryColor}
      />
    </Svg>
  )
}

export default ICHomeFilled