import styled from "styled-components";

export const LEFT_SIDEBAR_WIDTH = 250;

export const LeftSidebarContainer = styled.div`
  width: ${LEFT_SIDEBAR_WIDTH}px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 60px 5px 25px;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  border-right: 2px solid #252525;
  z-index: 2;
`;

export const SidebarTitle = styled.h2`
  font-size: 20px;
  color: ${(props) => props.theme.colors.lightText};
  margin-bottom: 20px;
`;

export const NodesContainer = styled.div`
  width: 100%;
  padding: 10px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
