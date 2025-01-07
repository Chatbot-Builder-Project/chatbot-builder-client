import styled from "styled-components";
import { Link } from "react-router-dom";

export const AppTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 300;
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.lightText};
`;

export const AppLogo = styled.img`
  width: 20px;
  height: 20px;
`;

export const AppContainer = styled.div`
  margin-top: 4rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  font-family: ${({ theme }) => theme.fonts.body};
  ${({ theme }) => theme.colors.primaryGradient};
`;

export const Navbar = styled.nav`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 150;
  border-radius: 99px;
  width: 100%;
  max-width: 700px;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.lightText};
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: 2rem;
  font-weight: 600;
`;

export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.lightText};
  text-decoration: none;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.muted};
  }
`;
