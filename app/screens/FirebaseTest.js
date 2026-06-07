import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView
} from "react-native";

import AuthService from "../../back/services/AuthService";

export default function FirebaseTestScreen() {

  const authService = new AuthService();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [user, setUser] =
    useState(null);

  async function handleRegister() {

    try {

      const tutor =
        await authService.registerTutor(
          email,
          password
        );

      setUser(tutor);

      Alert.alert(
        "Éxito",
        "Tutor registrado"
      );

    } catch (error) {

      Alert.alert(
        "Error",
        error.message
      );

    }
  }

  async function handleLogin() {

    try {

      const tutor =
        await authService.login(
          email,
          password
        );

      setUser(tutor);

      Alert.alert(
        "Éxito",
        "Login correcto"
      );

    } catch (error) {

      Alert.alert(
        "Error",
        error.message
      );

    }
  }

  async function handleLogout() {

    try {

      await authService.logout();

      setUser(null);

      Alert.alert(
        "Éxito",
        "Sesión cerrada"
      );

    } catch (error) {

      Alert.alert(
        "Error",
        error.message
      );

    }
  }

  function handleCurrentUser() {

    const tutor =
      authService.getCurrentTutor();

    setUser(tutor);
  }

  return (

    <ScrollView
      contentContainerStyle={{
        padding: 20
      }}
    >

      <Text>Email</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          marginBottom: 10
        }}
      />

      <Text>Password</Text>

      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          marginBottom: 20
        }}
      />

      <Button
        title="Registrar"
        onPress={handleRegister}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Login"
        onPress={handleLogin}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Usuario actual"
        onPress={handleCurrentUser}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Logout"
        onPress={handleLogout}
      />

      <View style={{ height: 20 }} />

      <Text>
        {JSON.stringify(
          user,
          null,
          2
        )}
      </Text>

    </ScrollView>
  );
}