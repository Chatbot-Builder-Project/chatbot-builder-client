import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setSelected } from "@chatbot-builder/store/slices/Builder/Nodes/slice";

const HeaderContainer = styled.div`
  height: 60px;
  background: #007bff;
  border-radius: 12px 12px 0 0;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const ChatHeader = () => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setSelected("header"));
  };

  return <HeaderContainer onClick={handleClick} />;
};
