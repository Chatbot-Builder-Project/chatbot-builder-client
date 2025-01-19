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
  animation: ${fadeIn} 0.6s ease-out 0.2s;
  animation-fill-mode: both;
  height: 100%;
`;

export const SearchSection = styled.div`
  border-radius: 8px;
  animation: ${fadeIn} 0.6s ease-out 0.3s;
  animation-fill-mode: both;

  input {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.colors.secondaryBackground};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.lightText};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const ListSection = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.nodeBackground};
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
