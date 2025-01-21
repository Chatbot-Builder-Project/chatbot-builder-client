import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setSelected } from "@chatbot-builder/store/slices/Builder/Nodes/slice";

const InputContainer = styled.div`
  height: 60px;
  background: #f1f3f5;
  border-radius: 0 0 12px 12px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #e9ecef;
  }
`;

export const ChatInput = () => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setSelected("input"));
  };

  return <InputContainer onClick={handleClick} />;
};
