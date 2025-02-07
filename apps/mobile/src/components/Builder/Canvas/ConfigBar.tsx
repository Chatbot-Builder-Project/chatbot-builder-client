import { IconChevronLeft, IconFocus2 } from "@tabler/icons-react-native";
import React from "react";
import { Touchable, TouchableOpacity } from "react-native";
import { Text, View, StyleSheet } from "react-native";

interface ConfigBarProps {
  resetPosition: () => void;
}
const ConfigBar: React.FC<ConfigBarProps> = ({ resetPosition }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <IconChevronLeft color="#ffffff" size={24} />
      </TouchableOpacity>
      <View>
        <Text style={styles.config}>Config</Text>
      </View>
      <TouchableOpacity onPress={resetPosition}>
        <IconFocus2 size={24} color="#009bff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  config: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Montserrat",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 50,
    height: 50,
    borderRadius: 50,
    width: "auto",

    backgroundColor: "#111111",
    borderWidth: 2,
    borderColor: "#252525",
  },
});

export default ConfigBar;
