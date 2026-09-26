import React, {useEffect} from "react";
import {
    Text,
    Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";

import Button from "../components/Button";
import { useUser } from "../context/UserContext";

export default function Profile() {

    const {
        user,
        logout
    } = useUser();

    useEffect(() => {
      
          ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP
          );
      
        }, []);

    async function handleLogout() {

        try {
            await logout();
        } catch (error) {

            Alert.alert(
                "Error",
                error.message
            );

        }
    }

    return (
        <SafeAreaView>

            <Text>
                {user?.email}
            </Text>

            <Button
                title="Cerrar sesión"
                onPress={handleLogout}
            />

        </SafeAreaView>
    );
}
