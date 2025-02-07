import styled from "styled-components";
import { ActionButton } from "../../component.styles";

export const CanvasConfigContainerBar = styled.div`
  position: absolute;
  display: flex;
  z-index: 3;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  top: 0px;
  right: 0px;
  height: 61px;
  width: 100%;
  background-color: #111111;
  border-bottom: 1px solid #252525;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  gap: 145px;
`;

export const SaveButton = styled(ActionButton)`
  background-color: #e0e0e0;
  color: #424242;

  &:hover {
    background-color: #d0d0d0;
  }
`;

export const ConfigContainer = styled(ActionButton)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: transparent;
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
