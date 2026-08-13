import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import colors from "../../styles/colors";

const SIZE = 110;
const SHADOW_OFFSET = 14;
const CENTER = SIZE / 2;
const ARC_RADIUS = SIZE / 2 - 10;

const getColorByState = (state) => {
  switch (state) {
    case "completado":
      return colors.secondaryShadow;

    case "en_progreso":
      return colors.secondaryShadow;

    case "disponible":
      return colors.secondary;

    case "bloqueado":
    default:
      return colors.primaryShadow;
  }
};

const createArc = (
  cx,
  cy,
  radius,
  startAngle,
  endAngle
) => {
  const start = polarToCartesian(
    cx,
    cy,
    radius,
    endAngle
  );

  const end = polarToCartesian(
    cx,
    cy,
    radius,
    startAngle
  );

  const largeArcFlag =
    endAngle - startAngle <= 180 ? 0 : 1;

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
    end.y,
  ].join(" ");
};

const polarToCartesian = (
  cx,
  cy,
  radius,
  angle
) => {
  const angleRadians = (angle * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(angleRadians),
    y: cy + radius * Math.sin(angleRadians),
  };
};

export default function LevelNode({
  number,
  state,
  sections = [],
  onPress,
}) {
  const isBlocked = state === "bloqueado";

  const backgroundColor =
    state === "bloqueado"
      ? colors.primaryShadow
      : colors.primary;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={isBlocked}
    >
      <View style={styles.wrapper}>

        <View
          style={[
            styles.node,
            {
              backgroundColor,
            },
          ]}
        >

          <Svg
            width={SIZE}
            height={SIZE}
            style={styles.arcsContainer}
            pointerEvents="none"
          >
            {sections.map((section, index) => {

              const anglePerSection =
                360 / sections.length;

              const gap = 8;

              const startAngle =
                index * anglePerSection - 90 + gap;

              const endAngle =
                (index + 1) * anglePerSection -
                90 -
                gap;

              const color =
                getColorByState(section.state);

              return (
                <Path
                  key={section.id}
                  d={createArc(
                    CENTER,
                    CENTER,
                    ARC_RADIUS,
                    startAngle,
                    endAngle
                  )}
                  stroke={color}
                  strokeWidth={8}
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}
          </Svg>

          <Text style={styles.text}>
            {number}
          </Text>

        </View>

        <View
          style={[
            styles.shadow,
            {
              backgroundColor:
                state === "bloqueado"
                  ? colors.primaryShadow
                  : colors.primaryShadow,
            },
          ]}
        />

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    width: SIZE,
    height: SIZE + SHADOW_OFFSET,
  },

  arcsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SIZE,
    height: SIZE,
    zIndex: 1,
  },

  node: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    zIndex: 2,
  },

  shadow: {
    position: "absolute",
    top: SHADOW_OFFSET,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    zIndex: 0,
  },

  text: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
  },
});