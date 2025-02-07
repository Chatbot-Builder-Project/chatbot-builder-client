import { IconPlus, IconHome, IconSettings } from "@tabler/icons-react-native";
import React, { useState, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import NodesBar from "./NodesBar";

const ControlBar = () => {
  const [isBarOpen, setIsBarOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const toggleBar = () => {
    const toValue = isBarOpen ? 0 : 1;
    Animated.parallel([
      Animated.spring(animation, {
        toValue,
        useNativeDriver: true,
        friction: 5,
      }),
    ]).start();
    setIsBarOpen(!isBarOpen);
  };

  const menuStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
    opacity: animation,
  };

  return (
    <>
      <TouchableOpacity onPress={toggleBar} style={styles.container}>
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <IconPlus color="#000" size={30} />
        </Animated.View>
        {isBarOpen && (
          <Animated.View style={[styles.menu, menuStyle]}>
            <NodesBar />
          </Animated.View>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    width: 50,
    height: 50,
    display: "flex",
    backgroundColor: "#f1f1f1",
  },
  menu: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    width: 50,
    right: 0,
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 8,
  },
});

export default ControlBar;
