import React, {
  useEffect,
  useState
} from "react";

import {
  View,
  ActivityIndicator,
  StyleSheet
} from "react-native";

import { useSQLiteContext } from "expo-sqlite";

import SymptomLogController from "../../back/controllers/symptomsController";

import CheckInForm from "../components/checkIn/CheckInForm";
import CheckInSummary from "../components/checkIn/CheckInSummary";

export default function CheckIn() {

  const db = useSQLiteContext();

  const [loading, setLoading] =
    useState(true);

  const [
    todayCheckIn,
    setTodayCheckIn
  ] = useState(null);

  const [editing, setEditing] =
    useState(false);

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

    setEditing(false);
  }

  if (loading) {

    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );

  }

  if (todayCheckIn && !editing) {

    return (
      <CheckInSummary
        checkIn={todayCheckIn}
        onEdit={() =>
          setEditing(true)
        }
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