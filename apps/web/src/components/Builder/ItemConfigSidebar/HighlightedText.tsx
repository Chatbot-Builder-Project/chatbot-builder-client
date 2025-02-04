import { Port } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import React from "react";

interface Props {
  text: string;
  inputPorts: Port[];
}

export const HighlightedText: React.FC<Props> = ({ text, inputPorts }) => {
  if (!text) return null;
  
  const parts = text.split(/(\{\{\d+\}\})/g);
  
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/\{\{(\d+)\}\}/);
        if (match) {
          const portId = parseInt(match[1], 10);
          const portExists = inputPorts?.some(port => port.info.id === portId);
          const color = portExists ? "#4CAF50" : "#f44336";
          return (
            <span key={index} style={{ color, fontWeight: "bold" }}>
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};
