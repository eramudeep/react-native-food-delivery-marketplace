import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"
import { appColors } from "../../utils/appColors"
function ICAdd({ size }) {
    return (
        <Svg width={size || 78} height={size || 78} viewBox="0 0 78 78" >
            <G data-name="Group 223" stroke="#fff">
                <G data-name="Ellipse 4" fill={appColors.secondaryColor} strokeWidth={5}>
                    <Circle cx={39} cy={39} r={39} stroke="none" />
                    <Circle cx={39} cy={39} r={36.5} fill="none" />
                </G>
                <G data-name="Group 23" fill="none" strokeWidth={4}>
                    <Path data-name="Line 3" d="M39 21.036v35.929" />
                    <Path data-name="Line 4" d="M21.036 39h35.929" />
                </G>
            </G>
        </Svg>
    )
}

export default ICAdd