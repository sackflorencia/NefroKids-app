import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";

import LevelNode from "../components/LevelNode";
import SectionHeader from "../components/SectionHeader";
import GameController from "../../back/controllers/gameController";

export default function Levels() {

  const db = useSQLiteContext();

  const [levels, setLevels] = useState([]);

  useEffect(() => {

    async function loadLevels() {

      try {

        const controller = new GameController(db);

        const data = await controller.getLevels();

        console.log("LEVELS:");
        console.log(data);

        setLevels(data);

      } catch (error) {

        console.error(error);

      }
    }

    loadLevels();

  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <SectionHeader
        section={1}
        title="Introducción a la diálisis peritoneal manual"
      />

      <View style={styles.mapContainer}>

        {levels.map((level, index) => (

          <View
            key={level.id}
            style={[
              styles.node,
              {
                top: index * 120,
                left: index % 2 === 0 ? 40 : 180,
              },
            ]}
          >

            <LevelNode
              number={level.numero}
              unlocked={true}
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