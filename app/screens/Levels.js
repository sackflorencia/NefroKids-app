import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LevelNode from "../components/level/LevelNode";
import SectionHeader from "../components/level/SectionHeader";
import LevelPreview from "../components/level/LevelPreview";

import { useSQLiteContext } from "expo-sqlite";
import GameController from "../../back/controllers/gameController";
import { useNavigation } from "@react-navigation/native";
import colors from "../styles/colors";

const SECTION_SIZE = 5;
const SECTION_TITLES = [
  "Introducción a la diálisis peritoneal manual",
  "Preparación y conexión",
  "Manejo y monitoreo",
  "Cierre y seguimiento",
  "Repaso final",
];
const REQUIRED_STARS_PER_SECTION = 10;

function getSectionInfo(index) {
  const section = Math.floor(index / SECTION_SIZE) + 1;
  return {
    section,
    title: SECTION_TITLES[section - 1] || `Sección ${section}`,
  };
}

export default function Levels() {
  const navigation = useNavigation();
  const db = useSQLiteContext();
  const [levels, setLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentSection, setCurrentSection] = useState(getSectionInfo(0));

  useEffect(() => {
    async function loadLevels() {
      try {
        const controller = new GameController(db);
        const data = await controller.getLevels();

        const baseLevels = Array.isArray(data) ? data : [];
        const generatedLevels = Array.from({ length: 15 - baseLevels.length }, (_, index) => ({
          id: `generated-${index + 1}`,
          numero: baseLevels.length + index + 1,
          nombre: `Nivel ${baseLevels.length + index + 1}`,
          descripcion: `Contenido del nivel ${baseLevels.length + index + 1}.`,
          xp_reward: 50 + index,
        }));

        setLevels([...baseLevels, ...generatedLevels].slice(0, 15));
      } catch (error) {
        console.error(error);
      }
    }

    loadLevels();
  }, []);

  const handleScroll = useCallback(
    (event) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const firstVisibleIndex = Math.max(
        0,
        Math.min(levels.length - 1, Math.floor((offsetY + 60) / 120))
      );
      setCurrentSection(getSectionInfo(firstVisibleIndex));
    },
    [levels.length]
  );

  const getNodeStyle = (index) => {
    const isLeft = index % 2 === 0;

    return {
      top: index * 120,
      left: isLeft ? 56 : undefined,
      right: isLeft ? undefined : 56,
    };
  };

  const canvasHeight = Math.max(700, levels.length * 130 + 60);

  return (
    <SafeAreaView style={styles.safeArea}>
      <SectionHeader
        section={currentSection.section}
        title={currentSection.title}
      />

      <View style={styles.mapContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={[styles.mapCanvas, { height: canvasHeight }]}>
            {levels.map((level, index) => {
              const isSectionStart = index % SECTION_SIZE === 0 && index > 0;
              const sectionNumber = Math.floor(index / SECTION_SIZE) + 1;

              return (
                <React.Fragment key={level.id}>
                  {isSectionStart && (
                    <View style={[styles.sectionGate, { top: index * 120 - 70 }]}>
                      <View style={styles.sectionGateLabelBox}>
                        <Text style={styles.sectionGateLabel}>⭐ {REQUIRED_STARS_PER_SECTION}</Text>
                      </View>

                      <View style={styles.sectionGateBadge}>
                        <Text style={styles.sectionGateBadgeText}>SECCIÓN {sectionNumber}</Text>
                      </View>

                      <View style={styles.sectionGateLabelBox}>
                        <Text style={styles.sectionGateLabel}>⭐ {REQUIRED_STARS_PER_SECTION}</Text>
                      </View>
                    </View>
                  )}

                  <View style={[styles.node, getNodeStyle(index)]}>
                    <LevelNode
                      number={level.numero}
                      unlocked={true}
                      onPress={() => setSelectedLevel(level)}
                      estrellas={2}
                    />
                  </View>
                </React.Fragment>
              );
            })}
          </View>
        </ScrollView>

        {selectedLevel && (
          <TouchableWithoutFeedback onPress={() => setSelectedLevel(null)}>
            <View style={styles.previewOverlay}>
              <TouchableWithoutFeedback>
                <View>
                  <LevelPreview
                    level={selectedLevel}
                    onStart={() => {
                      setSelectedLevel(null);
                      navigation.navigate("Game", { level: selectedLevel });
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
  safeArea: {
    flex: 1,
    backgroundColor: colors.background || "#f7f8fc",
  },
  mapContainer: {
    flex: 1,
    marginTop: 16,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  mapCanvas: {
    position: "relative",
    width: "100%",
  },
  sectionGate: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  sectionGateBadge: {
    backgroundColor: colors.secondary || "#5f7fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  sectionGateBadgeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  sectionGateLabelBox: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  sectionGateLabel: {
    color: colors.textDark,
    fontSize: 12,
    fontWeight: "700",
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