import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Platform,
  StyleSheet,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

import colors from "../styles/colors";
import typography from "../styles/typography";

export default function DatePickerField({
  label,
  value,
  onChange,
  placeholder = "Seleccionar fecha",
}) {

  const [showPicker, setShowPicker] = useState(false);

  function handleDateChange(event, selectedDate) {

    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      onChange(selectedDate);
    }
  }

  function formatDate(date) {

    if (!date) {
      return "";
    }

    return date.toLocaleDateString("es-AR");
  }

  return (
    <View style={styles.container}>

      <Text style={styles.label}>
        {label}
      </Text>

      <Pressable
        style={styles.input}
        onPress={() => setShowPicker(true)}
      >

        <Text
          style={
            value
              ? styles.valueText
              : styles.placeholderText
          }
        >
          {value
            ? formatDate(value)
            : placeholder}
        </Text>

      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={handleDateChange}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    ...typography.body,
    marginBottom: 8,
    color: colors.textDark,
  },

  input: {
    borderWidth: 2,
    borderColor: "#D6D6D6",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FAFAFA",
  },

  valueText: {
    ...typography.body,
    color: colors.textDark,
  },

  placeholderText: {
    ...typography.body,
    color: "#999",
  },
});