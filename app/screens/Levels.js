import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LevelNode from "../components/LevelNode";
import SectionHeader from "../components/SectionHeader";
import colors from "../styles/colors";

export default function Levels() {
  const LEVELS = [
    { id: 1, top: 40, left: 220, unlocked: true },
    { id: 2, top: 140, left: 80, unlocked: true },
    { id: 3, top: 260, left: 220, unlocked: true },
    { id: 4, top: 380, left: 100, unlocked: false },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <SectionHeader
        section={1}
        title="Introducción a la diálisis peritoneal manual"
      />

      <View style={styles.mapContainer}>

        {LEVELS.map((level) => (
          <View
            key={level.id}
            style={[
              styles.node,
              { top: level.top, left: level.left },
            ]}
          >
            <LevelNode
              number={level.id}
              unlocked={level.unlocked}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    marginTop: 20,
  },
  node: {
    position: "absolute",
  },
});