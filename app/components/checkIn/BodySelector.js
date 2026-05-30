import { PAIN_LOCATIONS } from "../../helpers/CheckInHelper";
import { View, Text } from "react-native";

export default function BodySelector({
  onSelect
}) {

  return (
    <View>
      {PAIN_LOCATIONS.map(pain => (
        <Text
          key={pain.value}
          onPress={() =>
            onSelect(pain.value)
          }
        >
          {pain.label}
        </Text>
      ))}
    </View>
  );
}