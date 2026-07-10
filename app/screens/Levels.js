import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LevelNode from "../components/level/LevelNode";
import SectionHeader from "../components/level/SectionHeader";
import LevelPreview from "../components/level/LevelPreview";

import { useSQLiteContext } from "expo-sqlite";
import ProgressController from "../../back/controllers/progressController";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";

export default function Levels() {
  const navigation = useNavigation();
  const db = useSQLiteContext();
  const { user } = useUser();
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {

    console.log("Entró al useEffect");
    async function loadLevels() {
      console.log("Entró al loadLevels");

      try {
        console.log("user:", user);

        if (!user?.childId) {
          console.log("No hay childId");
          return;
        }

        console.log("childId:", user.childId);

        const controller = new ProgressController(db);
        console.log("Controller creado");

        const data = await controller.getLevelsForChild(user.childId);
        console.log("Data:", data);

        setLevels(data);

      } catch (error) {
        console.error("ERROR:", error);
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
              sections={level.sections}
              onPress={() => {
                if (level.state !== "bloqueado") {
                  setSelectedLevel(level);
                }
              }}
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
                    onStartSection={section => {
                      setSelectedLevel(null);

                      if (section.type === "game") {
                        navigation.navigate("Game", {
                          levelId: selectedLevel.id,
                          sectionId: section.id,
                        });
                      }

                      if (section.type === "quiz") {
                        navigation.navigate("Quiz", {
                          levelId: selectedLevel.id,
                          sectionId: section.id,
                        });
                      }
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