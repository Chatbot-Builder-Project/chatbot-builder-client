import styled from "styled-components/native";
import Animated from "react-native-reanimated";

export const Container = styled.View`
  flex: 1;
  background-color: #1d1d1d;
`;

export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export const Wrapper = styled.View`
  background-color: red;
  flex: 1;
`;

export const AnimatedCanvas = styled(Animated.View)`
  flex: 1;
  background-color: #1d1d1d;
`;

export const CenterMarker = styled(Animated.View)`
  position: absolute;
  left: 50%;
  top: 50%;
  opacity: 0.5;
  pointer-events: none;
`;

export const CenterMarkerText = styled(Animated.Text)`
  font-size: 48px;
  color: #fff;
  font-weight: bold;
  user-select: none;
`;
