import styled from "styled-components";

export const Container = styled.div<{ $isOpened: boolean }>`
  position: absolute;
  right: ${(props) => (props.$isOpened ? "20px" : "-500px")};
  top: 50%;
  transform: translate(0, -50%);
  width: 400px;
  height: calc(100vh - 150px);
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  padding: 20px;
  transition: right 0.3s ease-in-out;
`;
