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
