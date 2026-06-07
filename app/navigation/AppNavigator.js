import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Levels from "../screens/Levels";
import CheckIn from "../screens/CheckIn";
import Review from "../screens/Review";
import GameScreen from "../screens/GameScreen";
import FirebaseTestScreen from "../screens/FirebaseTest";

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Levels" component={Levels} />
        <Stack.Screen name="CheckIn" component={CheckIn} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="FirebaseTest" component={FirebaseTestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}