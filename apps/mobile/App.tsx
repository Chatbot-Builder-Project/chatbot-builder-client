import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "@chatbot-builder/store/store";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ErrorBoundary } from "./src/components/ErrorBoundary/ErrorBoundary";
import { HomeScreen } from "./src/screens/Home/HomeScreen";
import { Canvas } from "./src/components/Builder/Canvas";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Font from "expo-font";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    FunnelSans: require("./assets/fonts/Funnel_Sans/FunnelSans-VariableFont_wght.ttf"),
    "FunnelSans-Italic": require("./assets/fonts/Funnel_Sans/FunnelSans-Italic-VariableFont_wght.ttf"),
    Montserrat: require("./assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf"),
    "Montserrat-Italic": require("./assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded) {
    return <View style={styles.container} />;
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <GestureHandlerRootView>
          <NavigationContainer>
            <Canvas />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </ErrorBoundary>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d1d",
  },
});
