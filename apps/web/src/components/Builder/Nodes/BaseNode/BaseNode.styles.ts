import styled from "styled-components";

export const NodeContainer = styled.div<{
  x: number;
  y: number;
  isDragging: boolean;
}>`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
  cursor: move;
  padding: 10px;
  background-color: lightblue;
  border-radius: 5px;
`;
