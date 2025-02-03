import styled from "styled-components";

export const NavList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

export const NavListContainer = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 15px;
`;

export const NavListItem = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 1rem;
  color: #888888;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #ffffff;
    transform: translateX(8px);
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }
`;

export const IconWrapper = styled.span`
  margin-right: 0.5rem;
`;

export const DashboardLayoutContainer = styled.div`
  background-color: #1d1d1d;
  width: 100%;
  height: 100%;
`;
