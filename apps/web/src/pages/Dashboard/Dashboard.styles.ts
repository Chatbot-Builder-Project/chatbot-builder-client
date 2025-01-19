import { IconButton } from "@mui/material";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DashboardContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  min-height: 100vh;
`;

export const StatisticsSection = styled.aside`
  position: sticky;
  top: 125px;
  height: 500px;
  width: 250px;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.dark};
  border-radius: 8px;
  animation: ${fadeIn} 0.6s ease-out;
  color: ${({ theme }) => theme.colors.lightText};
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  div {
    margin: ${({ theme }) => theme.spacing.sm} 0;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  height: calc(100vh - ${({ theme }) => theme.spacing.lg} * 2);
  color: ${({ theme }) => theme.colors.lightText};
  animation: ${fadeIn} 0.6s ease-out 0.2s;
  animation-fill-mode: both;
  height: 100%;
`;

export const SearchSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 500px;
  border-radius: 8px;
  animation: ${fadeIn} 0.6s ease-out 0.3s;
  animation-fill-mode: both;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:focus-within::after {
    width: 100%;
  }

  input {
    flex: 1;
    padding: ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.secondaryBackground};
    border: 1px solid transparent;
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.lightText};
    font-size: 1.1em;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);

    &::placeholder {
      color: ${({ theme }) => theme.colors.lightText}66;
    }

    &:focus {
      outline: none;
      background: ${({ theme }) => theme.colors.dark}99;
      box-shadow: 0 4px 12px ${({ theme }) => theme.colors.dark}33;
      transform: translateY(-1px);
    }
  }
`;

export const SearchButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.lightText};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.dark};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const ListSection = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  animation: ${fadeIn} 0.6s ease-out 0.4s;
  animation-fill-mode: both;
  display: flex;
  flex-direction: column;
  height: 100%;
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    position: sticky;
    top: 0;
    background: ${({ theme }) => theme.colors.nodeBackground};
    padding: ${({ theme }) => theme.spacing.sm} 0;
  }

  .item {
    padding: ${({ theme }) => theme.spacing.md};
    margin: ${({ theme }) => theme.spacing.sm} 0;
    background: ${({ theme }) => theme.colors.secondaryBackground};
    border-radius: 4px;
    cursor: pointer;
    height: 200px;
    transition: all 0.2s ease;
    animation: ${fadeIn} 0.6s ease-out;
    animation-fill-mode: both;

    &:hover {
      background: ${({ theme }) => theme.colors.gray};
      transform: translateX(4px);
    }

    &:nth-child(2) {
      animation-delay: 0.5s;
    }
    &:nth-child(3) {
      animation-delay: 0.6s;
    }
    &:nth-child(4) {
      animation-delay: 0.7s;
    }
  }
`;

export const ChatbotItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  background: ${({ theme }) => theme.colors.secondaryBackground};
  border-radius: 4px;
  cursor: pointer;
  height: 150px;
  transition: all 0.2s ease;
  position: relative;

  .image {
    width: 120px;
    height: 120px;
    background: ${({ theme }) => theme.colors.gray};
    border-radius: 4px;
    overflow: hidden;

    .placeholder {
      width: 100%;
      height: 100%;
      background: ${({ theme }) => theme.colors.gray};
    }
  }

  &:hover {
    background: ${({ theme }) => theme.colors.gray};
    transform: translateX(4px);
  }
`;

export const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  h3 {
    color: ${({ theme }) => theme.colors.lightText};
    margin: 0;
  }

  p {
    color: ${({ theme }) => theme.colors.lightText};
    opacity: 0.8;
    margin: 0;
  }
`;

export const SettingsButton = styled(IconButton)`
  position: absolute !important;
  bottom: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary} !important;

  &:hover {
    background: ${({ theme }) => theme.colors.gray} !important;
  }
`;

export const PopupContainer = styled.div`
  background: ${({ theme }) => theme.colors.nodeBackground};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
`;

export const PopupMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.lightText};
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;

  span {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.lightText}22;
  }

  &.delete {
    color: ${({ theme }) => theme.colors.error};
    &:hover {
      background: ${({ theme }) => theme.colors.error}22;
    }
  }
`;
