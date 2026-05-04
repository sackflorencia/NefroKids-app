import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Levels from "../screens/Levels";
import CheckIn from "../screens/CheckIn";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Levels" component={Levels} />
        <Stack.Screen name="CheckIn" component={CheckIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}