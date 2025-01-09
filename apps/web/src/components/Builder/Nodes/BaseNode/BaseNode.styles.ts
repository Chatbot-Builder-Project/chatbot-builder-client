import styled from "styled-components";

export const NodeContainer = styled.div<{
  $x: number;
  $y: number;
  $isDragging: boolean;
  $isLeftSidebar?: boolean;
}>`
  cursor: grab;
  position: absolute;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  opacity: ${(props) => (props.$isDragging ? 0 : 1)};
  padding: 10px;
  background-color: #888;
  border-radius: 5px;
  width: 200px;
  height: 100px;
`;
