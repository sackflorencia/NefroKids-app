import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";
import colors from "../styles/colors";
import typography from "../styles/typography";

const sections = [
  {
    title: "¿Qué es la diálisis peritoneal?",
    text:
      "La diálisis peritoneal es un tratamiento que ayuda a limpiar la sangre cuando los riñones no realizan esta función de forma adecuada. En niños/as, se usa como una alternativa segura y eficaz para eliminar desechos, exceso de agua y sales del organismo.",
  },
  {
    title: "¿Por qué se indica?",
    text:
      "Se indica cuando la función renal está disminuida y se necesitan medidas para mantener el equilibrio del cuerpo, controlar la presión arterial, evitar problemas por acumulación de líquidos y proteger el crecimiento y la salud general del niño/a.",
  },
  {
    title: "¿Cómo se realiza?",
    text:
      "Se introduce un líquido especial dentro de la cavidad abdominal a través de un catéter. Este líquido permite que los desechos y el exceso de líquido atraviesen la membrana del abdomen hacia el líquido de diálisis, que luego se drena y reemplaza según el plan indicado por el equipo médico.",
  },
];

const steps = [
  "Preparar todo el material limpio y verificar que esté en buen estado.",
  "Lavarse muy bien las manos y revisar el catéter y el área de inserción.",
  "Conectar el sistema de diálisis según la indicación médica y la técnica enseñada.",
  "Dejar que el líquido permanezca en la cavidad abdominal durante el tiempo recomendado.",
  "Drenar el líquido usado y descartar el material según la indicación del equipo de salud.",
  "Registrar la cantidad drenada, la apariencia del líquido y cualquier cambio observado.",
];

export default function Info() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Button
          title=""
          variant="back"
          colorVariant="secondary"
          direction="left"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />

        <Text style={[typography.title, styles.title]}>Información</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Pediatría / Nefrología</Text>
          <Text style={styles.heroTitle}>Diálisis peritoneal en niños/as</Text>
          <Text style={styles.heroText}>
            Este tratamiento requiere constancia, higiene y seguimiento médico
            cercano para proteger la salud del niño/a y favorecer su desarrollo.
          </Text>
        </View>

        {sections.map((section) => (
          <View key={section.title} style={styles.card}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionText}>{section.text}</Text>
          </View>
        ))}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Pasos a seguir</Text>

          {steps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepNumberContainer}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>

              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>Cuándo consultar al equipo médico</Text>
          <Text style={styles.warningText}>
            Debe comunicarse con el centro de salud si observa fiebre, dolor intenso,
            enrojecimiento o secreción alrededor del catéter, hinchazón, náuseas,
            vómitos, cambios bruscos en el líquido drenado o si el niño/a presenta
            signos de malestar o deshidratación.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: colors.background,
  },
  backButton: {
    alignSelf: "center",
  },
  title: {
    color: colors.textDark,
    textAlign: "center",
    flex: 1,
  },
  headerSpacer: {
    width: 48,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  eyebrow: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 10,
  },
  heroText: {
    fontSize: 18,
    lineHeight: 26,
    color: "#3F4A46",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 17,
    lineHeight: 26,
    color: "#2C3B36",
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 14,
    gap: 12,
  },
  stepNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  stepNumber: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textDark,
  },
  stepText: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    color: "#2C3B36",
  },
  warningCard: {
    backgroundColor: "#FFF9F1",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FCD7A4",
  },
  warningTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textLight,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 17,
    lineHeight: 25,
    color: "#4F3922",
  },
});