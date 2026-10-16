import React, {
  useEffect,
  useState
} from "react";

import {
  View,
  ActivityIndicator,
  StyleSheet
} from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import { useSQLiteContext } from "expo-sqlite";

import SymptomLogController from "../../back/controllers/symptomsController";

import CheckInForm from "../components/checkIn/CheckInForm";
import CheckInSummary from "../components/checkIn/CheckInSummary";
import Button from "../components/Button";

export default function CheckIn({ navigation, route }) {

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  }, []);

  const db = useSQLiteContext();

  const [loading, setLoading] = useState(true);

  const [
    todayCheckIn,
    setTodayCheckIn
  ] = useState(null);

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadTodayCheckIn();
  }, []);

  async function loadTodayCheckIn() {
    try {

      const controller =
        new SymptomLogController(db);

      const checkIn =
        await controller.getCurrentUserTodayCheckIn();

      setTodayCheckIn(checkIn);

    } finally {

      setLoading(false);

    }
  }

  async function handleSave(data) {

    const controller =
      new SymptomLogController(db);

    await controller.saveTodayCheckIn(data);

    await loadTodayCheckIn();

    // Mostrar pantalla de felicitación antes de ir a Home
    navigation.navigate("CheckInCongrats");
  }

  if (loading) {

    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );

  }

  if (todayCheckIn && !editing) {

    const viewOnly = route?.params?.viewOnly === true;

    return (
      <CheckInSummary
        checkIn={todayCheckIn}
        viewOnly={viewOnly}
        hasRecord={true}
        onEdit={() => setEditing(true)}
        onBack={() => navigation.navigate("Home")}
      />
    );

  }

  if (!todayCheckIn && route?.params?.viewOnly === true && !editing) {
    return (
      <CheckInSummary
        checkIn={{
          general_mood: null,
          pain_location: null,
          urine_color: null,
        }}
        viewOnly={true}
        hasRecord={false}
        onEdit={undefined}
        onBack={() => navigation.navigate("Home")}
      />
    );
  }

  return (
    <CheckInForm
      onFinish={handleSave}
    />
  );
}

const styles = StyleSheet.create({

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }

});