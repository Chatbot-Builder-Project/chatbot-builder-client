import styled from "styled-components";

export const NodeContainer = styled.div<{
  $x: number;
  $y: number;
  $isDragging: boolean;
  $isLeftSidebar?: boolean;
}>`
  ${(props) =>
    props.$isLeftSidebar
      ? `
        cursor: pointer;
        display: flex;
        position: static;
      `
      : `
        cursor: grab;
        position: absolute;
        left: ${props.$x}px;
        top: ${props.$y}px;
      `}
  opacity: ${(props) => (props.$isDragging && !props.$isLeftSidebar ? 0 : 1)};
  padding: 10px;
  background-color: #888;
  border-radius: 5px;
  width: 200px;
  height: 100px;
`;
