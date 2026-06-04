import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function ReviewOptionButton({
  text,
  selected,
  onPress
}) {

  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.buttonSelected]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#B8F0DF",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonSelected: {
    borderColor: "#1A7A5E",
    borderWidth: 2,
    backgroundColor: "#F0FBF7",
  },
  text: {
    color: "#111",
    fontSize: 17,
    fontWeight: "500",
  },
});
// import React from "react";
// import {
//   TouchableOpacity,
//   Text,
//   StyleSheet
// } from "react-native";

// export default function ReviewOptionButton({
//   text,
//   onPress
// }) {

//   return (
//     <TouchableOpacity
//       style={styles.button}
//       onPress={onPress}
//     >
//       <Text style={styles.text}>
//         {text}
//       </Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({

//   button: {
//   backgroundColor: "#F5F5F5",

//   borderWidth: 4,
//   borderColor: "#B8F0DF",

//   borderRadius: 25,

//   paddingVertical: 20,

//   alignItems: "center"
// },

// text: {
//   color: "#111",
//   fontSize: 20,
//   fontWeight: "500"
// }
// });