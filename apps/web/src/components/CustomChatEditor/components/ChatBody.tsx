import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setSelected } from "@chatbot-builder/store/slices/Builder/Nodes/slice";

const BodyContainer = styled.div`
  flex: 1;
  background: #ffffff;
  padding: 20px;
  overflow-y: auto;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
  }
`;

export const ChatBody = () => {
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setSelected("body"));
  };

  return <BodyContainer onClick={handleClick} />;
};
