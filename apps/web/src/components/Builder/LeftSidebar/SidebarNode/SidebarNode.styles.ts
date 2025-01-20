import styled from "styled-components";

export const SidebarNodeContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.gray};
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-in-out;
  width: 100%;
  color: ${(props) => props.theme.colors.lightText};
  text-weight: 800;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.nodeBackground};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transform: translate(-2px, -2px);
  }
`;

export const AccordionSummaryTypography = styled.p`
  color: ${(props) => props.theme.colors.lightText};
  font-size: 16px;
`;
