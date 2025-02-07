import styled from "styled-components";

export const NodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0px 10px;
  gap: 10px;
  min-width: 200px;
  position: relative;
`;

export const NodeIcon = styled.div`
  font-size: 20px;
`;

export const NodeTitle = styled.div`
  font-size: 16px;
  line-height: 20px;
  height: 20px;
  color: ${(props) => props.theme.colors.lightText};
`;
export const NodeTypeText = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme.colors.lightText};
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const NextNode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  right: -13px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  rotate: 45deg;
  background-color: ${(props) => props.theme.colors.primary};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.colors.muted};
  }
`;

export const PrevNode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -25px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.colors.muted};
  }
`;
