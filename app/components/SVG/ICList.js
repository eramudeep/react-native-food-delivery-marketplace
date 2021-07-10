import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
import { appColors } from "../../utils/appColors"

function ICList({size}) {
  return (
    <Svg
    height={size}
    viewBox="0 0 512 512"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path d="M320.418 60.309H123.691c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h196.727c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5zM320.418 135.097H123.691c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h196.727c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5zM320.418 209.886H123.691c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h196.727c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5zM371.432 264.589c-58.865 0-106.755 47.89-106.755 106.755S312.566 478.1 371.432 478.1s106.755-47.891 106.755-106.756-47.89-106.755-106.755-106.755zm0 198.511c-50.594 0-91.755-41.161-91.755-91.756 0-50.594 41.161-91.755 91.755-91.755s91.755 41.161 91.755 91.755c0 50.595-41.162 91.756-91.755 91.756z" 
    fill={appColors.voiletLight}
    />
    <Path d="M371.432 310.136c4.143 0 7.5-3.357 7.5-7.5V299.2c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v3.436c0 4.143 3.357 7.5 7.5 7.5zM417.144 315.027l-2.43 2.429a7.5 7.5 0 00-.003 10.606 7.5 7.5 0 0010.606.003l2.43-2.429a7.5 7.5 0 00.003-10.606 7.5 7.5 0 00-10.606-.003zM432.64 371.344c0 4.143 3.357 7.5 7.5 7.5h3.436c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-3.436a7.5 7.5 0 00-7.5 7.5zM302.723 363.844h-3.436c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h3.436c4.143 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5zM425.317 414.625a7.496 7.496 0 00-10.606.003 7.5 7.5 0 00.003 10.606l2.43 2.429a7.5 7.5 0 0010.606-.003 7.5 7.5 0 00-.003-10.606zM371.432 432.553a7.499 7.499 0 00-7.5 7.5v3.436c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-3.436a7.5 7.5 0 00-7.5-7.5zM317.543 414.625l-2.429 2.429a7.5 7.5 0 0010.607 10.607l2.429-2.429a7.5 7.5 0 00-10.607-10.607zM325.722 315.028a7.5 7.5 0 00-10.607 10.607l2.429 2.429a7.501 7.501 0 0010.607-10.607zM391.874 363.844h-12.942V331.76c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v39.584c0 4.143 3.357 7.5 7.5 7.5h20.442c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5z" 
    fill={appColors.voiletLight}
    />
    <Path d="M485.521 289.224a7.503 7.503 0 00-10.471-1.697 7.502 7.502 0 00-1.697 10.471C488.823 319.453 497 344.816 497 371.344c0 69.239-56.33 125.569-125.568 125.569-69.239 0-125.569-56.33-125.569-125.569 0-69.238 56.33-125.568 125.569-125.568 30.53 0 59.962 11.095 82.873 31.24a7.5 7.5 0 009.904-11.266 140.41 140.41 0 00-88.833-34.913V113.619h64.043c7.989 0 14.489-6.5 14.489-14.489V46.853c0-26.351-21.828-46.767-45.995-46.767h-176.27c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h141.219c-7.741 8.348-12.486 19.511-12.486 31.767v184.356c-40.323 3.152-75.922 23.391-99.542 53.465H123.691c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h126.861a139.587 139.587 0 00-17.549 47.17H77.784V38.812c0-13.082 10.644-23.726 23.726-23.726h100.146c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5H101.51c-21.354 0-38.726 17.372-38.726 38.726v308.032H7.5a7.499 7.499 0 00-7.5 7.5v14.537c0 34.747 28.27 63.016 63.017 63.016h24.154c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5H63.017C36.54 416.897 15 395.357 15 368.881v-7.037h216.19a141.663 141.663 0 00-.328 9.5c0 15.937 2.671 31.26 7.58 45.553H117.158c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h127.43c22.664 47.284 71.002 80.017 126.843 80.017 77.51 0 140.568-63.06 140.568-140.569.001-29.698-9.155-58.095-26.478-82.121zM438.908 46.853v51.766h-63.532V46.853c0-17.517 14.25-31.767 31.767-31.767 17.515 0 31.765 14.25 31.765 31.767z" 
    fill={appColors.voiletLight}
    />
  </Svg>
  )
}

export default ICList