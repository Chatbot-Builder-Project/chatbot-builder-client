import styled from "styled-components";
import { TextField } from "@mui/material";

export const Container = styled.div<{ $isOpened: boolean }>`
  position: absolute;
  right: ${(props) => (props.$isOpened ? "20px" : "-500px")};
  top: 50%;
  transform: translate(0, -50%);
  width: 400px;
  height: calc(100vh - 150px);
  background-color: #111111;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border: 2px solid #252525;
  padding: 20px;
  transition: right 0.3s ease-in-out;
`;

export const Title = styled.h2``;

export const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ddd;
  background-color: #1d1d1d;
  color: #fff;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

export const SectionTitle = styled.h3`
  margin: 16px 0 8px;
  font-size: 14px;
  color: #666;
`;

export const OptionContainer = styled.div`
  margin: 8px 0;
`;

export const OptionRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #373737;
  background-color: #1d1d1d;
  color: #fff;
  border-radius: 4px;
`;

export const ArrayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ArrayItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${(props) => props.theme.colors.accent};
  }
`;

export const SaveButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin-top: 16px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.accent};
  }
`;

export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    color: white;
    background: ${(props) => props.theme.colors.background};
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #373737;
  }

  & .MuiInputLabel-root {
    color: ${(props) => props.theme.colors.lightGray};
  }
`;

export const ValidationError = styled.div`
  color: ${(props) => props.theme.colors.error};
  font-size: 12px;
  margin-top: 4px;
`;
