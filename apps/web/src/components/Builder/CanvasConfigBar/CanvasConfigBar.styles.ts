import styled from "styled-components";
import { ActionButton } from "../../component.styles";

export const CanvasConfigContainerBar = styled.div`
  position: absolute;
  display: flex;
  z-index: 3;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  top: 0px;
  right: 0px;
  height: 50px;
  width: 100%;
  background-color: #111111;
  border-bottom: 2px solid #252525;
`;

export const SaveButton = styled(ActionButton)`
  background-color: #e0e0e0;
  color: #424242;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export const CenterButton = styled(ActionButton)`
  background-color: #e0e0e0;
  color: #424242;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export const PublishButton = styled(ActionButton)`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  transition: background 1s ease;

  &:hover {
    background: ${(props) => props.theme.colors.primaryGradient};
  }
`;
