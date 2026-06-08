import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogIn from "../screens/auth/LogIn";
import Register from "../screens/auth/Register";

const Stack = createNativeStackNavigator();
export default function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={LogIn}
            />

            <Stack.Screen
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
}