
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Button from "../Button";
import colors from "../../styles/colors";

const SECTION_INFO = {
  game: {
    title: "Aprender jugando",
    description:
      "Realizá el procedimiento paso a paso en el simulador.",
    button: "Jugar"
  },
  quiz: {
    title: "Poné a prueba tus conocimientos",
    description:
      "Respondé las preguntas de repaso del nivel.",
    button: "Responder"
  }
};

export default function LevelPreview({
  level,
  onStartSection,
}) {

  const sections = level?.sections || [];

  const firstAvailableIndex = sections.findIndex(
    section => section.state !== "blocked"
  );

  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Seleccionar inicialmente la primera sección habilitada
  useEffect(() => {
    setCurrentSectionIndex(
      firstAvailableIndex >= 0 ? firstAvailableIndex : 0
    );
  }, [level?.id, firstAvailableIndex]);

  if (!level) {
    return null;
  }

  const currentSection = sections[currentSectionIndex];

  if (!currentSection) {
    return null;
  }

  const info = SECTION_INFO[currentSection.type];

  if (!info) {
    return null;
  }

  const hasPrevious = currentSectionIndex > 0;
  const hasNext = currentSectionIndex < sections.length - 1;

  function previousSection() {
    if (hasPrevious) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  }

  function nextSection() {
    if (hasNext) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {level.nombre}
      </Text>

      <Text style={styles.description}>
        {level.descripcion}
      </Text>

      <Text style={styles.xp}>
        ⭐ {level.xp_reward} XP
      </Text>

      <View style={styles.section}>

        {/* Navegación entre secciones */}
        <View style={styles.sectionNavigation}>

          {hasPrevious ? (
            <TouchableOpacity
              onPress={previousSection}
              style={styles.arrowButton}
            >
              <Text style={styles.arrow}>‹</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.arrowPlaceholder} />
          )}

          <Text style={styles.sectionTitle}>
            {info.title}
          </Text>

          {hasNext ? (
            <TouchableOpacity
              onPress={nextSection}
              style={styles.arrowButton}
            >
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.arrowPlaceholder} />
          )}

        </View>

        <Text style={styles.sectionDescription}>
          {info.description}
        </Text>

        {currentSection.state === "completed" && (
          <>
            <Text style={styles.completed}>
              ✅ Completado
            </Text>

            <Button
              title="Repetir"
              onPress={() => onStartSection(currentSection)}
            />
          </>
        )}

        {currentSection.state === "available" && (
          <Button
            title={info.button}
            onPress={() => onStartSection(currentSection)}
          />
        )}

        {currentSection.state === "blocked" && (
          <Text style={styles.blocked}>
            🔒 Completá la sección anterior para desbloquearla.
          </Text>
        )}

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 5, // Bajá este valor para subir el cuadro
    marginBottom: 80,
    padding: 20,
    borderRadius: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: colors.textDark,
    marginBottom: 16,
  },

  xp: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 24,
  },

  section: {
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    paddingTop: 18,
    marginTop: 18,
  },

  sectionNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  arrowButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  arrowPlaceholder: {
    width: 36,
    height: 36,
  },

  arrow: {
    fontSize: 36,
    color: colors.primary,
    lineHeight: 40,
    fontWeight: "500",
  },

  sectionTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "center",
  },

  sectionDescription: {
    fontSize: 15,
    color: colors.textDark,
    marginBottom: 14,
    textAlign: "center",
  },

  completed: {
    color: "#4CAF50",
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },

  blocked: {
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
  },

});
