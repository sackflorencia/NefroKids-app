import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogIn from "../screens/auth/LogIn";
import Register from "../screens/auth/Register";
import UserRegistration from "../screens/auth/UserRegistration";
import Welcome from "../screens/auth/Welcome";

const Stack = createNativeStackNavigator();
export default function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen
                name="LogIn"
                component={LogIn}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Register"
                component={UserRegistration}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}