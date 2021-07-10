import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function ICMobile({height,width}) {
  return (
    <Svg width={width|| 512} height={height|| 512} viewBox="0 0 74 74">
      <G fill="#fff">
        <Path
          xmlns="http://www.w3.org/2000/svg"
          d="M53.5 72h-33a4 4 0 01-4-4V6a4 4 0 014-4h33a4 4 0 014 4v62a4 4 0 01-4 4zm-33-68a2 2 0 00-2 2v62a2 2 0 002 2h33a2 2 0 002-2V6a2 2 0 00-2-2z"
          data-original="#000000"
        />
        <Path
          xmlns="http://www.w3.org/2000/svg"
          d="M56.5 13h-39a1 1 0 010-2h39a1 1 0 010 2zM56.5 59h-39a1 1 0 010-2h39a1 1 0 010 2zM37 68.188a3.688 3.688 0 113.688-3.688A3.692 3.692 0 0137 68.188zm0-5.375a1.688 1.688 0 101.688 1.687A1.689 1.689 0 0037 62.813zM41 8.75h-8a1 1 0 010-2h8a1 1 0 010 2z"
          data-original="#000000"
        />
      </G>
    </Svg>
  )
}

export default ICMobile
