import { View, Text, TouchableOpacity } from "react-native";
export default function ColorOptions({ options, onSelect }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {options.map(color => (
        <TouchableOpacity
          key={color}
          style={{
            backgroundColor: color,
            width: 40,
            height: 40,
            borderRadius: 20
          }}
          onPress={() => onSelect(color)}
        />
      ))}
    </View>
  );
}