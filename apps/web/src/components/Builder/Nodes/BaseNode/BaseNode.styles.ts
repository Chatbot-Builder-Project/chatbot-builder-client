import styled from "styled-components";

export const NodeContainer = styled.div<{
  $x: number;
  $y: number;
  $isDragging: boolean;
}>`
  position: absolute;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
  cursor: grab;
  padding: 10px;
  background-color: ${(props) => (props.$isDragging ? "red" : "white")};
  border-radius: 5px;
  width: 200px;
  height: 100px;
`;
