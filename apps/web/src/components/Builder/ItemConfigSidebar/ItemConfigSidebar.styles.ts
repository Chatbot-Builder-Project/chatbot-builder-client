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

export const Title = styled.h2``;

export const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid #ddd;
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
