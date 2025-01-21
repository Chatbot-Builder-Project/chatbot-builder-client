import styled from "styled-components";
import { LEFT_SIDEBAR_WIDTH } from "../LeftSidebar/LeftSidebar.styles";

export const LayoutContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
  margin-left: ${LEFT_SIDEBAR_WIDTH}px;
  position: relative;
  overflow: hidden;
`;
