import { store } from "@chatbot-builder/store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Canvas } from "./components/Builder/Canvas";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { useFonts } from "expo-font";
import React from "react";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    FunnelSans: require("./assets/fonts/Funnel_Sans/FunnelSans-VariableFont_wght.ttf"),
    "FunnelSans-Italic": require("./assets/fonts/Funnel_Sans/FunnelSans-Italic-VariableFont_wght.ttf"),
    Montserrat: require("./assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf"),
    "Montserrat-Italic": require("./assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <Provider store={store}>
          <NavigationContainer>
            <Canvas />
          </NavigationContainer>
        </Provider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d1d",
  },
});
