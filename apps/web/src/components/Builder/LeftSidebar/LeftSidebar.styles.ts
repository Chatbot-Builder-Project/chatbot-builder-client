import styled from "styled-components";

export const LEFT_SIDEBAR_WIDTH = 250;

export const LeftSidebarContainer = styled.div`
  width: ${LEFT_SIDEBAR_WIDTH}px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 70px 5px 25px;
  align-items: center;
  gap: 10px;
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  border-right: 1px solid #252525;
  z-index: 2;
`;

export const SidebarTitle = styled.h2`
  width: 100%;
  height: auto;
  font-size: 16px;
  color: ${(props) => props.theme.colors.lightText};
  padding: 0px 10px;
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

export const SidebarEnumContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  overflow-y: auto;
`;

export const EnumItem = styled.div`
  margin-left: 10px;
  padding: 5px;
  // border-left: 2px solid ${(props) => props.theme.colors.primary};
`;

export const EnumOptionsContainer = styled.div`
  margin-left: 15px;
  padding-left: 10px;
  // border-left: 1px dashed ${(props) => props.theme.colors.primary};
`;

export const EnumHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;

export const EnumButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.lightText};
  cursor: pointer;
  font-size: 10px;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

export const IconButton = styled.button<{ isDelete?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) =>
    props.isDelete ? props.theme.colors.error : props.theme.colors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

export const TextField = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  border: none;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.lightText};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray};
    opacity: 0.7;
  }

  &:focus::placeholder {
    opacity: 0.5;
  }
`;

export const EnumField = styled.div`
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  width: 100%;
`;
