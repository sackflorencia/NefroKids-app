import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStackNavigator from "./HomeStackNavigator";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({

        tabBarIcon: ({ color, size }) => {

          let iconName;

          if (route.name === "Inicio") {
            iconName = "home";
          }

          if (route.name === "Perfil") {
            iconName = "person";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

      })}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeStackNavigator}
      />

      <Tab.Screen
        name="Perfil"
        component={Profile}
      />

    </Tab.Navigator>
  );
}