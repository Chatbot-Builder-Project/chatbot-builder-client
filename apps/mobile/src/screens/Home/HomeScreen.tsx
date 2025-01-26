import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Chatbot Builder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d1d",
  },
  text: {
    fontFamily: "Montserrat",
    color: "#fff",
    fontSize: 20,
  },
});
