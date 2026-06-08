import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from "react-native";

import colors from "../styles/colors";
import typography from "../styles/typography";

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none"
}) {
  return (
    <View style={styles.container}>

      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />

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
    paddingVertical: 14,
    backgroundColor: "#FAFAFA",
  },
});