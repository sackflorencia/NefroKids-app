import React from "react";
import { View, Text, Button } from "react-native";
import { MOODS, PAIN_LOCATIONS, URINE_COLORS, urineLabel, getLabel } from "../../helpers/CheckInHelper";

export default function CheckInSummary({
  checkIn,
  onEdit
}) {

  return (
    <View>

      <Text>
        Estos son tus datos de hoy
      </Text>

      <Text>
        Estado de ánimo:
        {" "}
        {getLabel(MOODS, checkIn.general_mood)}
      </Text>

      <Text>
        Dolor:
        {" "}
        {getLabel(PAIN_LOCATIONS, checkIn.pain_location)}
      </Text>

      <Text>
        Color de orina:
        {" "}
        {getLabel(URINE_COLORS, checkIn.urine_color)}
      </Text>

      <Button
        title="Modificar"
        onPress={onEdit}
      />

    </View>
  );
}