import styled from "styled-components";
import { Link } from "react-router-dom";

export const AppContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin-top: 4rem;
  background-color: ${({ theme }) => theme.colors.black};
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.body};
`;

export const ContentsContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 2rem;
  align-items: center;
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
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.lightText};
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  font-weight: 600;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
`;

export const UserSection = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  min-width: max-content;
`;

export const AuthButton = styled(Link)`
  color: ${({ theme }) => theme.colors.lightText};
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const NavLink = styled(Link)<{ isActive: boolean }>`
  color: ${({ theme }) => theme.colors.lightText};
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.lightText : theme.colors.lightGray};

  &:hover {
    color: ${({ theme }) => theme.colors.lightText};
  }
`;
