import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LevelNode from "../components/LevelNode";
import SectionHeader from "../components/SectionHeader";
import colors from "../styles/colors";

export default function Levels() {
  const [levels, setLevels] = useState([]);
  useEffect(() => {

  async function loadLevels() {

    const controller = new GameController(db);

    const data = await controller.getLevels();

    setLevels(data);
  }

  loadLevels();

}, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <SectionHeader
        section={1}
        title="Introducción a la diálisis peritoneal manual"
      />

      <View style={styles.mapContainer}>

        {levels.map((level) => (
          <View
            key={level.id}
            style={[
              styles.node,
              { top: level.top, left: level.left },
            ]}
          >
            <LevelNode
              number={level.id}
              unlocked={level.unlocked}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    marginTop: 20,
  },
  node: {
    position: "absolute",
  },
});