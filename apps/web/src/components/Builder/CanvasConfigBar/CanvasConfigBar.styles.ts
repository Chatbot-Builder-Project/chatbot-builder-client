import styled from "styled-components";
import { ActionButton } from "../../component.styles";

export const CanvasConfigContainerBar = styled.div`
  position: absolute;
  display: flex;

  align-items: center;
  padding: 10px;
  top: 10px;
  right: 20px;
  height: 50px;
  width: auto;
  // background-color: #ffffff;
  border-radius: 20px 20px;
  // box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
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
