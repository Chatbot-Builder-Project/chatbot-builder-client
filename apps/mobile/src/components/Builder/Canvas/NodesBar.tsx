import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addNode } from "@chatbot-builder/store/slices/Builder/Nodes/slice"; // Import addNode action
import { NODES } from "@chatbot-builder/client/nodes";
import {
  NodeData,
  NodeType,
} from "@chatbot-builder/store/slices/Builder/Nodes/types";
import {
  IconRoute,
  IconDatabaseExport,
  IconSwitch2,
  IconPrompt,
} from "@tabler/icons-react-native";
const NODES_ICONS = {
  [NodeType.Interaction]: IconRoute,
  [NodeType.Static]: IconDatabaseExport,
  [NodeType.Switch]: IconSwitch2,
  [NodeType.Prompt]: IconPrompt,
};

const NodesBar = () => {
  const dispatch = useDispatch();

  const handleAddNode = (node: NodeData) => {
    console.log("asdasdasdsa");
    dispatch(
      addNode({
        ...node,
        visual: {
          x: 0,
          y: 0,
        },
      })
    );
  };

  return (
    <View style={styles.container}>
      {Object.entries(NODES).map(([nodeType, value]) => {
        const Icon = NODES_ICONS[nodeType];
        return (
          <TouchableOpacity
            key={nodeType}
            style={styles.nodeButton}
            onPress={() => handleAddNode(value)}
          >
            <Icon size={32} color="#fff" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111111",
    gap: 20,
    padding: 10,
  },
  nodeButton: {
    height: 32,
    width: 32,
    borderRadius: 5,
  },
  nodeLabel: {
    color: "#000",
  },
});

export default NodesBar;
