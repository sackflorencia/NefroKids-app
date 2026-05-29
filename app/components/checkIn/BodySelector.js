import { View, Text, TouchableOpacity } from "react-native";
export default function BodySelector({ onSelect }) {
  return (
    <View>
      <Text onPress={() => onSelect("head")}>Cabeza</Text>
      <Text onPress={() => onSelect("stomach")}>Panza</Text>
    </View>
  );
}