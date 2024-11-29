import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import styled from "styled-components";

const Comp = styled(Text)`
  color: red;
  background-color: blue;
  padding: 10px;
`;

const Box = styled(View)`
  display: flex;
  height: 100%;
  background-color: green;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return (
    <Box>
      <Comp>Open up App.tsx to start working on your app! testtttt</Comp>
      <StatusBar style="auto" />
    </Box>
  );
}
