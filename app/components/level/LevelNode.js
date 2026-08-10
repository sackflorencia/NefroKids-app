import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import colors from "../../styles/colors";

const getArcColor = (index, estrellas = 3) => {
  const starCount = Math.max(0, Math.min(3, Number(estrellas) || 0));
  return index < starCount ? colors.secondaryShadow : colors.primaryShadow;
};

const SIZE = 110;
const SHADOW_OFFSET = 14;
const CENTER = SIZE / 2;
const ARC_RADIUS = SIZE / 2 - 10;
const ARC_ANGLE = 40 * (Math.PI / 180);
const ARC_START_X = CENTER + ARC_RADIUS * Math.cos(-ARC_ANGLE);
const ARC_START_Y = CENTER + ARC_RADIUS * Math.sin(-ARC_ANGLE);
const ARC_END_X = CENTER + ARC_RADIUS * Math.cos(ARC_ANGLE);
const ARC_END_Y = CENTER + ARC_RADIUS * Math.sin(ARC_ANGLE);
const ARC_PATH = `M ${ARC_START_X.toFixed(2)} ${ARC_START_Y.toFixed(2)} A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 1 ${ARC_END_X.toFixed(2)} ${ARC_END_Y.toFixed(2)}`;

export default function LevelNode({ number, unlocked = true, onPress}) {
  const arcColors = [0, 1, 2].map((index) => getArcColor(index));

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.wrapper}>
        <View
          style={[
            styles.node,
            {
              backgroundColor: colors.primary,
            },
          ]}
        >
          <Svg width={SIZE} height={SIZE} style={styles.arcsContainer} pointerEvents="none">
            {arcColors.map((color, index) => (
              <G key={index} transform={`rotate(${index * 120}, ${CENTER}, ${CENTER})`}>
                <Path
                  d={ARC_PATH}
                  stroke={color}
                  strokeWidth={8}
                  strokeLinecap="round"
                  fill="none"
                />
              </G>
            ))}
          </Svg>

          <Text style={styles.text}>{number}</Text>
        </View>

        <View
          style={[
            styles.shadow,
            {
              backgroundColor: colors.primaryShadow,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}

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