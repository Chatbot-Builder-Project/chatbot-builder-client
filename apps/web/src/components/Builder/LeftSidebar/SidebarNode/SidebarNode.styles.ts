import styled from "styled-components";

export const SidebarNodeContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
  width: 100%;
  &:hover {
    background-color: #e0e0e0;
  }
`;
