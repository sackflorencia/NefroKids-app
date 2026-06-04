import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MOODS, PAIN_LOCATIONS, URINE_COLORS, getLabel } from "../../helpers/CheckInHelper";
import Button from "../Button";
import colors from "../../styles/colors";

export default function CheckInSummary({ checkIn, onEdit }) {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>

        <Text style={styles.title}>Estos son tus datos de hoy</Text>

        <View style={styles.card}>
          <SummaryRow label="Estado de ánimo" value={getLabel(MOODS, checkIn.general_mood)} />
          <SummaryRow label="Dolor"            value={getLabel(PAIN_LOCATIONS, checkIn.pain_location)} />
          <SummaryRow label="Color de orina"   value={getLabel(URINE_COLORS, checkIn.urine_color)} />
        </View>

      </View>

      <View style={styles.footer}>
        <Button title="Modificar" variant="primary" onPress={onEdit} style={styles.button} />
      </View>

    </SafeAreaView>
  );
}

function SummaryRow({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
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
    fontSize: 24,
    fontWeight: "700",
    color: colors.textDark,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    gap: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 36,
  },
  button: {
    width: "100%",
  },
});