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
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #373737 #111111;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #111111;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #373737;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #454545;
  }
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
  border: 1px solid #373737;
  border-radius: 4px;
  min-height: 100px;
  background-color: #1d1d1d;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  white-space: pre-wrap;

  &:focus {
    outline: none;
    border-color: #2196f3;
  }

  span {
    display: inline;
  }
`;

export const TemplateEditor = styled.div`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #373737;
  border-radius: 4px;
  min-height: 100px;
  background-color: #1d1d1d;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  white-space: pre-wrap;
  cursor: text;
  overflow-y: auto;
  max-height: 300px;

  &:focus {
    outline: none;
    border-color: #2196f3;
  }

  span {
    display: inline;
  }
`;

export const SectionTitle = styled.h3`
  margin: 16px 0 8px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.lightText};
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

export const OutputTypeSwitch = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  font-family: "Montserrat", sans-serif;
`;

export const SwitchLabel = styled.span`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  color: #ffffff;
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #2196f3;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;
