import { MOODS } from "../../helpers/CheckInHelper";
import { View, Text } from "react-native";

export default function FeelingSelector({
  onSelect
}) {

  return (
    <View>
      {MOODS.map(mood => (
        <Text
          key={mood.value}
          onPress={() =>
            onSelect(mood.value)
          }
        >
          {mood.label}
        </Text>

      ))}

    </View>
  );
}