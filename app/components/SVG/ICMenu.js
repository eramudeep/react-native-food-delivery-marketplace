import * as React from "react"
import Svg, { Path,Circle } from "react-native-svg"
import { appColors } from "../../utils/appColors"

function ICMenu({size}) {
  return (
    <Svg height={size||512} width={size||512} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <Path fill={"#000"} d="M400 0H112C50.144 0 0 50.144 0 112v288c0 61.856 50.144 112 112 112h288c61.856 0 112-50.144 112-112V112C512 50.144 461.856 0 400 0zm80 400c0 44.183-35.817 80-80 80H112c-44.183 0-80-35.817-80-80V112c0-44.183 35.817-80 80-80h288c44.183 0 80 35.817 80 80v288z" />
      <Path fill={"#000"} d="M208 128h192v32H208zM208 240h192v32H208zM208 352h192v32H208z" />
      <Circle fill={"#000"} cx={144} cy={144} r={32} />
      <Circle fill={"#000"} cx={144} cy={256} r={32} />
      <Circle fill={"#000"} cx={144} cy={368} r={32} />
    </Svg>
  )
}

export default ICMenu