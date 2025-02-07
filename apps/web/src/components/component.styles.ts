import { Link } from "react-router-dom";
import styled from "styled-components";

export const ActionButton = styled.button`
  padding: 8px 16px;
  margin: 0 8px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const AppTitle = styled(Link)`
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.lightText};
`;

export const AppLogoContainer = styled.img`
  width: 23px;
  height: 23px;
`;
