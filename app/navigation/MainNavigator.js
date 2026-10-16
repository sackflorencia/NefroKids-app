import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeStackNavigator from "./HomeStackNavigator";
import Profile from "../screens/Profile";
import colors from "../styles/colors";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.textDark,
        tabBarInactiveTintColor: "#93A8A0",
        tabBarStyle: {
          position: "absolute",
          bottom: 14,
          left: 16,
          right: 16,
          height: 78,
          borderRadius: 22,
          borderTopWidth: 0,
          backgroundColor: "#FFFFFF",
          paddingTop: 8,
          paddingBottom: 10,
          paddingHorizontal: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 12,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
          marginTop: 3,
        },
        tabBarItemStyle: ({ focused }) => ({
          borderRadius: 16,
          paddingVertical: 6,
          backgroundColor: focused ? "#EAFBF4" : "transparent",
          marginHorizontal: 4,
        }),
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = "home";

          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline";
          }

          if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size + 2}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStackNavigator} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}