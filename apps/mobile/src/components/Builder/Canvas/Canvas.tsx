import { View, Text, StyleSheet } from "react-native";

const Canvas: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Canvas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d1d",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: 20,
  },
});

export default Canvas;
