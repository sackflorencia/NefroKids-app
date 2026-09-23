import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOODS, PAIN_LOCATIONS, URINE_COLORS, getLabel } from "../../helpers/CheckInHelper";
import Button from "../Button";
import colors from "../../styles/colors";

export default function CheckInSummary({ checkIn, onEdit }) {
  // Parsear pain_location de JSON string a array
  let painArray = [];
  try {
    if (checkIn.pain_location) {
      const parsed = JSON.parse(checkIn.pain_location);
      painArray = Array.isArray(parsed) ? parsed : [checkIn.pain_location];
    }
  } catch (e) {
    // Si no es JSON válido, tratar como valor simple
    painArray = checkIn.pain_location ? [checkIn.pain_location] : [];
  }
  
  const painLabels = painArray
    .map(pain => getLabel(PAIN_LOCATIONS, pain))
    .filter(Boolean)
    .join(", ") || getLabel(PAIN_LOCATIONS, "none");

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.title}>¡Hoy completaste tu check-in!</Text>

        <View style={styles.card}>
          <SummaryRow 
            label="Estado de ánimo" 
            value={getLabel(MOODS, checkIn.general_mood)} 
            icon="😊"
          />
          <View style={styles.divider} />
          <SummaryRow 
            label="Dolor" 
            value={painLabels || getLabel(PAIN_LOCATIONS, "none")} 
            icon="🤕"
          />
          <View style={styles.divider} />
          <SummaryRow 
            label="Color de orina" 
            value={getLabel(URINE_COLORS, checkIn.urine_color)} 
            icon="💧"
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Excelente trabajo. Tus datos han sido guardados correctamente.
          </Text>
        </View>

      </View>

      <View style={styles.footer}>
        <Button 
          title="Modificar datos" 
          variant="secondary" 
          onPress={onEdit} 
          style={styles.button} 
        />
      </View>

    </SafeAreaView>
  );
}

function SummaryRow({ label, value, icon }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{icon} {label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    gap: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "center",
    lineHeight: 35,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    gap: 0,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  row: {
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  label: {
    fontSize: 18,
    color: "#888",
    fontWeight: "600",
    flex: 1,
  },
  value: {
    fontSize: 18,
    color: colors.textDark,
    fontWeight: "700",
    textAlign: "right",
    flex: 1,
  },
  infoBox: {
    backgroundColor: "rgba(164, 241, 204, 0.2)",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.primaryShadow,
  },
  infoText: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: "500",
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  button: {
    width: "100%",
  },
});