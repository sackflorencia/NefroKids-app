import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogIn from "../screens/auth/LogIn";
import Register from "../screens/auth/Register";
import Welcome from "../screens/auth/Welcome";

const Stack = createNativeStackNavigator();
export default function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen
                name="LogIn"
                component={LogIn}
            />

            <Stack.Screen
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
}