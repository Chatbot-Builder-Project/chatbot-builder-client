import styled from "styled-components";

const ConfigContainer = styled.div`
  padding: 20px;
  width: 100%;
`;

const ConfigTitle = styled.h3`
  color: ${(props) => props.theme.colors.lightText};
  margin-bottom: 20px;
`;

const ConfigItem = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.colors.lightText};
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #444;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.lightText};
`;

interface ChatElementConfigProps {
  elementId: string;
}

export const ChatElementConfig: React.FC<ChatElementConfigProps> = ({
  elementId,
}) => {
  const getTitle = () => {
    switch (elementId) {
      case "header":
        return "Header Configuration";
      case "body":
        return "Body Configuration";
      case "input":
        return "Input Configuration";
      default:
        return "Configuration";
    }
  };

  return (
    <ConfigContainer>
      <ConfigTitle>{getTitle()}</ConfigTitle>
      <ConfigItem>
        <Label>Background Color</Label>
        <Input type="color" />
      </ConfigItem>
      <ConfigItem>
        <Label>Height (px)</Label>
        <Input type="number" min="0" />
      </ConfigItem>
      <ConfigItem>
        <Label>Padding (px)</Label>
        <Input type="number" min="0" />
      </ConfigItem>
    </ConfigContainer>
  );
};
