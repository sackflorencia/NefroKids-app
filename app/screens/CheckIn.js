import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

import SymptomLogController from "../../back/controllers/symptomsController";

import CheckInForm from "../components/checkIn/CheckInForm";
import CheckInSummary from "../components/checkIn/CheckInSummary";

export default function CheckIn() {
    const db = useSQLiteContext();
    const [loading, setLoading] = useState(true);
    const [todayCheckIn, setTodayCheckIn] = useState(null);
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        loadTodayCheckIn();
    }, []);

    async function loadTodayCheckIn() {
        try {
            const controller = new SymptomLogController(db);
            const checkIn = await controller.getCurrentUserTodayCheckIn();
            setTodayCheckIn(checkIn);
        } finally {
            setLoading(false);
        }
    }

    async function handleSave(data) {

        try {

            console.log("handleSave");

            const controller =
                new SymptomLogController(db);

            await controller.saveTodayCheckIn(
                data
            );

            console.log("reload");

            await loadTodayCheckIn();

            setEditing(false);

        } catch (error) {

            console.error(
                "ERROR GUARDANDO CHECKIN"
            );

            console.error(error);
        }
    }

    if (loading) {
        return <ActivityIndicator />;
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
            initialValues={todayCheckIn}
            onFinish={handleSave}
        />
    );
}