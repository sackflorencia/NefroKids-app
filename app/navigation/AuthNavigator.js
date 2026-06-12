import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogIn from "../screens/auth/LogIn";
import Register from "../screens/auth/Register";
import Welcome from "../screens/auth/Welcome";
import Introduction from "../screens/auth/Introduction";

const Stack = createNativeStackNavigator();
export default function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName="Introduction">
            <Stack.Screen name="Introduction" component={Introduction} options={{headerShown: false}}/>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen
                name="LogIn"
                component={LogIn}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}