import React, { memo } from "react";
import { View } from "react-native";
import Svg, { Circle, Pattern, Rect, Defs } from "react-native-svg";

const GridBackground: React.FC = () => {
  return (
    <Svg height="100%" width="100%" viewBox="0 0 5000 5000">
      <Defs>
        <Pattern
          id="grid"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <Circle cx="10" cy="10" r="2" fill="rgba(67, 67, 67, 0.25)" />
        </Pattern>
      </Defs>
      <Rect x="0" y="0" height="100%" width="100%" fill="url(#grid)" />
    </Svg>
  );
};

export default memo(GridBackground);
