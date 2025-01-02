import styled, { keyframes } from "styled-components";

const progressAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.dark};
  overflow: hidden;
  position: relative;
  border-radius: 2px;
`;

export const ProgressIndicator = styled.div<{ color?: string }>`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.color || props.theme.colors.primary};
  animation: ${progressAnimation} 1.5s infinite linear;
  transform: translateX(-100%);
`;
