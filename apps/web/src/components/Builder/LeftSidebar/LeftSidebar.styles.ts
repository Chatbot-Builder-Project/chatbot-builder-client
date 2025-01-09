import styled from "styled-components";

export const LEFT_SIDEBAR_WIDTH = 250;

export const LeftSidebarContainer = styled.div`
  width: ${LEFT_SIDEBAR_WIDTH}px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 25px 5px;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
`;
