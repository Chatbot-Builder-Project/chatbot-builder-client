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
  background-color: rgb(208, 208, 208);
  border-right: 1px solid #ccc;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
`;
