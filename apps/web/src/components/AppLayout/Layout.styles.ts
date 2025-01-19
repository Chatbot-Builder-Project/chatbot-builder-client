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
  max-width: 1400px;
  width: 100%;
  margin-top: 4rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.body};
  ${({ theme }) => theme.colors.primaryGradient};
`;

export const ContentsContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Navbar = styled.nav`
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  // top: 20px;
  // left: 50%;
  // transform: translateX(-50%);
  z-index: 150;
  // border-radius: 99px;
  width: 100%;
  // max-width: 700px;
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

export const NavLink = styled(Link)<{ isActive: boolean }>`
  color: ${({ theme }) => theme.colors.lightText};
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.lightText};

  &:hover {
    color: ${({ theme }) => theme.colors.muted};
  }
`;
