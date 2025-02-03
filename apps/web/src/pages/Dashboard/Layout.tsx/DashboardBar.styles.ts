import styled from "styled-components";

export const DashboardBarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

export const SearchBarContainer = styled.div`
  flex: 1;
  max-width: 380px;
  margin: 0 20px;
  position: relative;
`;

export const SearchContentWrapper = styled.div<{ $isActive: boolean }>`
  position: absolute;
  left: ${(props) => (props.$isActive ? "12px" : "50%")};
  top: 50%;
  transform: ${(props) =>
    props.$isActive ? "translateY(-50%)" : "translate(-50%, -50%)"};
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: none;
  transition: all 0.3s ease;
  color: #666;
  font-size: 14px;
  font-weight: 600;
`;

export const SearchLabel = styled.span`
  transition: all 0.3s ease;
`;

export const SearchIconWrapper = styled.div<{ $isActive: boolean }>`
  position: absolute;
  left: ${(props) => (props.$isActive ? "12px" : "50%")};
  top: 50%;
  transform: ${(props) =>
    props.$isActive ? "translateY(-50%)" : "translate(-50%, -50%)"};
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: all 0.3s ease;
  margin-right: 8px;
`;

export const SearchInput = styled.input<{ $isActive: boolean }>`
  width: 100%;
  padding: 8px 12px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.$isActive ? props.theme.colors.primary : "#333")};
  background-color: #2d2d2d;
  color: white;
  outline: none;
  transition: all 0.3s ease;
  cursor: text;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export const NewButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }
`;
