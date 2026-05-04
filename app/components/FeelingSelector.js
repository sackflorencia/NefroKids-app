import { View, Text, TouchableOpacity } from "react-native";
export default function FeelingSelector({ onSelect }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text onPress={() => onSelect("happy")}>😃</Text>
      <Text onPress={() => onSelect("neutral")}>😐</Text>
      <Text onPress={() => onSelect("sad")}>😢</Text>
    </View>
  );
}