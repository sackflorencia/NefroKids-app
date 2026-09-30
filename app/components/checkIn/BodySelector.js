import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Path, Rect, G } from "react-native-svg";
import Button from "../Button";
import color from "../../styles/colors";
 
/**
 * Valores: deben coincidir con los `value` de PAIN_LOCATIONS
 * (head, stomach, arm, leg). Ajustá los nombres si en tu helper son otros.
 */
const COLORS = {
  base: color.primary,        // zona sin seleccionar
  selected: color.secondary,    // zona con dolor
  stroke: "#8A94A3",
};
 
function parseSelected(selected) {
  if (Array.isArray(selected)) return selected;
  if (typeof selected === "string") {
    try {
      const parsed = JSON.parse(selected);
      return Array.isArray(parsed) ? parsed : [selected];
    } catch (e) {
      return selected ? [selected] : [];
    }
  }
  return selected ? [selected] : [];
}
 
export default function BodySelector({ selected, onSelect }) {
  const selectedArray = parseSelected(selected);
  const isNone = selectedArray.includes("none");
 
  const isOn = (zone) => selectedArray.includes(zone);
  const fill = (zone) => (isOn(zone) ? COLORS.selected : COLORS.base);
 
  function handlePress(pain) {
    // Si estaba "none", arranca de cero con este dolor
    if (isNone) {
      onSelect([pain]);
      return;
    }
    // Si ya estaba seleccionado, se quita
    if (selectedArray.includes(pain)) {
      onSelect(selectedArray.filter((p) => p !== pain));
      return;
    }
    // Si no, se suma
    onSelect([...selectedArray, pain]);
  }
 
  function handleNone() {
    onSelect(["none"]);
  }
 
  // hitSlop no existe en SVG, así que hacemos las zonas lo bastante grandes.
  // Cada zona es un <G> con onPress; el área tocable es la forma dibujada.
  const shape = {
    stroke: COLORS.stroke,
    strokeWidth: 1.5,
  };
 
  return (
    <View style={styles.container}>
      {/* Etiquetas de lo seleccionado (feedback para el usuario) */}
      <Text style={styles.hint}>
        {isNone
          ? "No te duele nada"
          : selectedArray.length
          ? "Tocá de nuevo una zona para quitarla"
          : "Tocá la zona donde te duele"}
      </Text>

      <Svg width={230} height={280} viewBox="0 0 240 440">
        {/* CABEZA */}
        <G onPress={() => handlePress("head")}>
          <Circle cx={120} cy={42} r={32} fill={fill("head")} {...shape} />
        </G>
 
        {/* Cuello (decorativo, no tocable) */}
        <Rect x={108} y={72} width={24} height={16} fill={COLORS.base} {...shape} />
 
        {/* BRAZO IZQUIERDO */}
        <G onPress={() => handlePress("arm")}>
          <Path
            d="M78 98 C58 100 50 112 46 136 L34 214 C32 226 50 230 54 218 L68 150 L78 130 Z"
            fill={fill("arm")}
            {...shape}
          />
          {/* BRAZO DERECHO */}
          <Path
            d="M162 98 C182 100 190 112 194 136 L206 214 C208 226 190 230 186 218 L172 150 L162 130 Z"
            fill={fill("arm")}
            {...shape}
          />
        </G>
 
        {/* PANZA */}
        <G onPress={() => handlePress("stomach")}>
          <Path
            d="M78 98 L162 98 L166 150 C166 170 160 186 156 204 L84 204 C80 186 74 170 74 150 Z"
            fill={fill("stomach")}
            {...shape}
          />
        </G>
 
        {/* PIERNA IZQUIERDA + DERECHA */}
        <G onPress={() => handlePress("leg")}>
          <Path
            d="M84 204 L119 204 L116 330 L112 420 C112 430 88 430 88 420 L84 330 C82 290 80 240 84 204 Z"
            fill={fill("leg")}
            {...shape}
          />
          <Path
            d="M121 204 L156 204 C160 240 158 290 156 330 L152 420 C152 430 128 430 128 420 L124 330 Z"
            fill={fill("leg")}
            {...shape}
          />
        </G>
      </Svg>
 
      <Button
        title="No me duele nada"
        selected={isNone}
        onPress={handleNone}
        variant="option"
        style={styles.noneButton}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  noneButton: {
    alignSelf: "stretch", // sin esto el botón se encoge al ancho del texto
    marginTop: 0,      // tu Button dibuja la sombra ~8px por debajo
  },
  hint: {
    fontSize: 14,
    color: "#6B7280",
  },
});