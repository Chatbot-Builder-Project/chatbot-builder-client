import styled from "styled-components";

export const BaseNodeContainer = styled.div<{
  $x: number;
  $y: number;
  $isDragging: boolean;
  $isSelected: boolean;
  $isLeftSidebar?: boolean;
}>`
  cursor: ${(props) => (props.$isDragging ? "grab" : "default")};
  position: absolute;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  opacity: ${(props) => (props.$isDragging ? 0 : 1)};
  padding: 10px;
  ${(props) =>
    props.$isSelected
      ? `border: 3px solid ${props.theme.colors.primary};`
      : `border: 3px solid ${props.theme.colors.dark};`}
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.theme.colors.nodeBackground};
  border-radius: 5px;
  z-index: 20;
  transition: border-color 0.2s ease-in-out;
`;
