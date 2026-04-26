import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import LevelNode from "../components/LevelNode";
import SectionHeader from "../components/SectionHeader";
// import globalStyles from "../styles/globalStyles";
import colors from "../styles/colors";

export default function Levels() {
  return (
    <SafeAreaView>
      
      <SectionHeader
        section={1}
        title="Introducción a la diálisis peritoneal manual"
      />

      <View style={styles.mapContainer}>
        {/* conexión simple */}
        <View style={styles.line} />

        <View style={[styles.node, { top: 40, left: 220 }]}>
          <LevelNode number={1} unlocked />
        </View>

        <View style={[styles.node, { top: 140, left: 80 }]}>
          <LevelNode number={2} unlocked />
        </View>

        <View style={[styles.node, { top: 260, left: 220 }]}>
          <LevelNode number={3} unlocked />
        </View>

        <View style={[styles.node, { top: 380, left: 100 }]}>
          <LevelNode number={4} unlocked={false} />
        </View>
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
  line: {
    position: "absolute",
    top: 90,
    left: 120,
    width: 140,
    height: 260,
    backgroundColor: colors.primary,
    borderRadius: 70,
  },
});