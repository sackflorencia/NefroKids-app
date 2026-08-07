import React from "react";
import Svg, { Path } from "react-native-svg";

import colors from "../../styles/colors";


export default function SectionRing({
    sections = []
}) {

    const size = 110;
    const strokeWidth = 8;
    const radius = 45;
    const center = size / 2;

    if (sections.length === 0) {
        return null;
    }

    const anglePerSection = 360 / sections.length;


    return (
        <Svg
            width={size}
            height={size}
        >

            {sections.map((section, index) => {

                const startAngle =
                    index * anglePerSection - 90;

                const endAngle =
                    (index + 1) * anglePerSection - 90;


                const color =
                    section.status === "completed"
                        ? colors.textDark
                        : colors.textLight;


                return (
                    <Path
                        key={index}
                        d={
                            createArc(
                                center,
                                center,
                                radius,
                                startAngle,
                                endAngle
                            )
                        }
                        stroke={color}
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                );

            })}

        </Svg>
    );
}


function createArc(
    cx,
    cy,
    radius,
    startAngle,
    endAngle
) {

    const start =
        polarToCartesian(
            cx,
            cy,
            radius,
            endAngle
        );

    const end =
        polarToCartesian(
            cx,
            cy,
            radius,
            startAngle
        );


    const largeArcFlag =
        endAngle - startAngle <= 180
            ? 0
            : 1;


    return [
        "M",
        start.x,
        start.y,
        "A",
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(" ");

}


function polarToCartesian(
    cx,
    cy,
    radius,
    angle
) {

    const angleRadians =
        (angle * Math.PI) / 180;


    return {
        x:
            cx +
            radius *
            Math.cos(angleRadians),

        y:
            cy +
            radius *
            Math.sin(angleRadians)
    };

}