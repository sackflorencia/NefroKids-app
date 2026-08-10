import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Asset } from 'expo-asset';
import images, { ALL_IMAGES } from './assets/images';
import AppNavigator from "./app/navigation/AppNavigator";
import InitDB from "./back/database";
import "react-native-get-random-values";
import FirebaseService from "./back/services/FirebaseService";


FirebaseService.initialize();


export default function App() {
  const [isReady, setIsReady] = useState(false);


  useEffect(() => {
    async function loadAssets() {
      try {
        await Asset.loadAsync(ALL_IMAGES);
      } catch (e) {
        console.warn('Asset preloading failed', e);
      } finally {
        setIsReady(true);
      }
    }
    loadAssets();
  }, []);


  if (!isReady) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }


  return (
    <>
      <InitDB>
        <AppNavigator />
      </InitDB>
    </>
  );
}


const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});


// si ponemos en statusBar, style="auto"?
