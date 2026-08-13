import React from "react";
import {
  View,
  Text,
  StyleSheet,
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

  if (!level) {
    return null;
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

      {level.sections.map(section => {

        const info = SECTION_INFO[section.type];
        if (!info) {
          return null;
        }
        return (

          <View
            key={section.id}
            style={styles.section}
          >

            <Text style={styles.sectionTitle}>
              {info.title}
            </Text>

            <Text style={styles.sectionDescription}>
              {info.description}
            </Text>

            {section.state === "completed" && (
              <>
                <Text style={styles.completed}>
                  ✅ Completado
                </Text>

                <Button
                  title="Repetir"
                  onPress={() =>
                    onStartSection(section)
                  }
                />
              </>
            )}

            {section.state === "available" && (
              <Button
                title={info.button}
                onPress={() =>
                  onStartSection(section)
                }
              />
            )}

            {section.state === "blocked" && (
              <Text style={styles.blocked}>
                🔒 Completá la sección anterior para desbloquearla.
              </Text>
            )}

          </View>

        );

      })}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",
    margin: 20,
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 6,
  },

  sectionDescription: {
    fontSize: 15,
    color: colors.textDark,
    marginBottom: 14,
  },

  completed: {
    color: "#4CAF50",
    marginBottom: 10,
    fontWeight: "600",
  },

  blocked: {
    color: "#999",
    fontStyle: "italic",
  },

});