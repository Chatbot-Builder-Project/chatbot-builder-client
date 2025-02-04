import styled from "styled-components";

export const BaseNodeContainer = styled.div<{
  $x: number;
  $y: number;
  $isDragging: boolean;
  $isSelected: boolean;
  $isStartNode?: boolean;
  $isLeftSidebar?: boolean;
}>`
  cursor: ${(props) => (props.$isDragging ? "grab" : "default")};
  position: absolute;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  opacity: ${(props) => (props.$isDragging ? 0 : 1)};
  padding: 10px;
  ${(props) =>
    props.$isStartNode
      ? `border: 2px solid transparent;
         background-clip: padding-box;
         &::before {
           content: '';
           position: absolute;
           top: -1px;
           left: -1px;
           right: -1px;
           bottom: -1px;
           background: linear-gradient(135deg, #6A00FF, #A600FF, #E100FF);
           z-index: -1;
           border-radius: inherit;
         }`
      : ""};
  ${(props) =>
    props.$isSelected
      ? `border: 3px solid ${props.theme.colors.primary}`
      : `border: 3px solid ${props.theme.colors.dark}`};
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.theme.colors.nodeBackground};
  border-radius: 5px;
  z-index: 20;
  transition: border-color 0.2s ease-in-out;
`;
