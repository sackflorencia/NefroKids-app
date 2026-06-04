import { MOODS } from "../../helpers/CheckInHelper";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function FeelingSelector({
  onSelect
}) {

  return (
    <View>
      {MOODS.map(mood => (

        <TouchableOpacity
          key={mood.value}
          style={styles.option}
          onPress={() =>
            onSelect(mood.value)
          }
        >

          <Text style={styles.text}>
            {mood.label}
          </Text>

        </TouchableOpacity>

      ))}

    </View>
  );
}
const styles = StyleSheet.create({

  option: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 3
  },

  text: {
    textAlign: "center",
    fontSize: 18
  }

});