import { View, TouchableOpacity } from "react-native";
import { URINE_COLORS } from "../../helpers/CheckInHelper";

export default function ColorOptions({
  onSelect
}) {
  return (
    <View
      style={{
        flexDirection: "row"
      }}
    >
      {URINE_COLORS.map(item => (
        <TouchableOpacity
          key={item.value}
          style={{
            backgroundColor:
              item.color,
            width: 40,
            height: 40,
            borderRadius: 20
          }}
          onPress={() =>
            onSelect(item.value)
          }
        />
      ))}
    </View>
  );
}