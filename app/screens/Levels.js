import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LevelNode from "../components/level/LevelNode";
import SectionHeader from "../components/level/SectionHeader";
import LevelPreview from "../components/level/LevelPreview";

import { useSQLiteContext } from "expo-sqlite";
import GameController from "../../back/controllers/gameController";
import { useNavigation } from "@react-navigation/native";


export default function Levels() {

  const db = useSQLiteContext();
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [activeLevel, setActiveLevel] = useState(null);

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
              onPress={() => setSelectedLevel(level)}
            />

          </View>

        ))}
        {selectedLevel && (
          <TouchableWithoutFeedback
            onPress={() => setSelectedLevel(null)}
          >
            <View style={styles.previewOverlay}>
              <TouchableWithoutFeedback>
                <View>
                  <LevelPreview
                    level={selectedLevel}
                    onStart={() => {
                      setActiveLevel(selectedLevel);
                      setSelectedLevel(null);
                      navigation.navigate("Game");
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        )}

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
  previewOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
});