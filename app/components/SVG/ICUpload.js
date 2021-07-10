import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"

function ICUpload({ size }) {
    return (
        <Svg width={size || 128} height={size || 128} viewBox="0 0 128 128">
            <G data-name="Group 347">
                <G data-name="Ellipse 57" fill="#5663ff" stroke="#fff" strokeWidth={6}>
                    <Circle cx={64} cy={64} r={64} stroke="none" />
                    <Circle cx={64} cy={64} r={61} fill="none" />
                </G>
                <Path
                    data-name="Path 428"
                    d="M86.509 57.463L66.834 37.789a4.634 4.634 0 00-6.623 0L40.535 57.463a4.684 4.684 0 106.623 6.626l11.747-11.75V86.23a4.659 4.659 0 009.317 0V52.339l11.746 11.75a4.654 4.654 0 106.541-6.622z"
                    fill="#fff"
                />
            </G>
        </Svg>
    )
}

export default ICUpload