import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ICStore({size}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size||512}
      height={size||512}
      viewBox="0 0 480.111 480.111"
    >
      <Path
        xmlns="http://www.w3.org/2000/svg"
        d="M456.034 271.056v169c0 22.056-17.944 40-40 40h-352c-22.056 0-40-17.944-40-40v-169a8 8 0 0116 0v169c0 13.234 10.766 24 24 24h87v-135c0-22.056 17.944-40 40-40h98c22.056 0 40 17.944 40 40v103a8 8 0 01-16 0v-103c0-13.233-10.767-24-24-24h-98c-13.233 0-24 10.767-24 24v135h65v-126a8 8 0 0116 0v126h168c13.233 0 24-10.766 24-24v-169a8 8 0 0116 0zm-404-143a8 8 0 008 8c435.268 0 413.687.778 416.867-1.661a7.956 7.956 0 003.047-5.232c.446-3.215 3.317 4.691-52.574-124.288a8 8 0 00-7.341-4.819h-360a8 8 0 00-7.34 4.819l-52 120c-.919 2.122-.66-1.246-.66 52.813.058 36.385 29.665 65.987 66 65.987 24.979 0 46.778-13.99 57.983-34.556 25.026 45.99 90.945 46.041 116.017.031 25.052 45.973 90.942 45.983 116 0 11.197 20.548 32.998 34.525 58 34.525 36.393 0 66-29.607 66-66a8 8 0 00-16 0c0 27.57-22.43 50-50 50s-50-22.43-50-50a8 8 0 00-16 0c0 27.57-22.43 50-50 50s-50-22.43-50-50a8 8 0 00-16 0c0 27.57-22.43 50-50 50-26.957 0-50-21.664-50-50.4a8 8 0 00-16 0c0 28.493-22.899 50.4-50 50.4-27.526 0-49.957-22.436-50-50v-47.961L65.286 16.056h349.496l45.066 104H60.034a8 8 0 00-8 8z"
        fill="#fff"
        data-original="#000000"
      />
    </Svg>
  )
}

export default ICStore