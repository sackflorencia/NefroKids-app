import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import colors from "../../styles/colors";
import SectionRing from "./SectionRing";

export default function LevelNode({
  number,
  sections = [],
  onPress
}) {

  const blocked = sections.every(
    section => section.state === "blocked"
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={blocked}
    >

      <View
        style={[
          styles.wrapper,
          blocked && styles.blocked
        ]}
      >
        <View style={styles.container}>
          <SectionRing
            sections={sections}
          />
          <View
            style={[
              styles.node,
              {
                backgroundColor: colors.primary
              }
            ]}
          >
            <Text style={styles.text}>
              {number}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.shadow,
            {
              backgroundColor: colors.primaryShadow
            }
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}
const SIZE = 90;
const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },

  container: {
    width: 110,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
  },

  node: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  shadow: {
    position: "absolute",
    top: 20,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },

  blocked: {
    opacity: 0.4,
  },

  text: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  }

});