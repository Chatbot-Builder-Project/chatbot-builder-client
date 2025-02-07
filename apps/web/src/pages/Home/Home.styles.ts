import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin: 0 auto;
  gap: 4rem;
  height: calc(100vh - 6rem + 10px);
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(
      circle at center,
      rgba(67, 67, 67, 0.25) 4px,
      transparent 1px
    );
    background-position: center;
    background-size: 35px 35px;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 650px;
  z-index: 1;
`;

export const HomeText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.veryLarge};
  color: ${({ theme }) => theme.colors.lightText};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  line-height: 1;
`;

export const SubText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.lightGray};
  font-family: ${({ theme }) => theme.fonts.heading};
  line-height: 1.5;
  max-width: 400px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const StyledButton = styled.button<{ primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ primary, theme }) =>
    primary
      ? `
    background-color: ${theme.colors.lightText};
    color: ${theme.colors.black};
    border: none;
    &:hover {
      color: ${theme.colors.lightText};
      background-color: ${theme.colors.background};
    }
    `
      : `
    background-color: transparent;
    color: ${theme.colors.lightText};
    border: 2px solid ${theme.colors.lightText};
    &:hover {
      background-color: ${theme.colors.background};
    }
  `}
`;

export const HomePageImage = styled.div`
  user-select: none;
  width: 500px;
  height: 350px;
  object-fit: cover;
  position: relative;
  border-radius: 25px;
  perspective: 1000px;
  transform-style: preserve-3d;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: rotateY(-10deg);
    transition: transform 0.5s;
    border-radius: 25px;
    border: 3px solid ${({ theme }) => theme.colors.gray};
  }

  &:after {
    transform: rotateY(-10deg);
    transition: transform 0.5s;
    box-shadow: inset 0px 0px 10px 0px #000;
    content: "";
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
    width: 100%;
  }
`;
