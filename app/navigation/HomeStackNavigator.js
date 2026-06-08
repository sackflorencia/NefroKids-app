import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Levels from "../screens/Levels";
import CheckIn from "../screens/CheckIn";
import Review from "../screens/Review";
import GameScreen from "../screens/GameScreen";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {

    return (
        <Stack.Navigator initialRouteName="Home">

            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Levels"
                component={Levels}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CheckIn"
                component={CheckIn}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Review"
                component={Review}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Game"
                component={GameScreen}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    );
}