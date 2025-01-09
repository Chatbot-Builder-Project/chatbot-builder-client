import { useCanvas } from '../../../contexts/CanvasContext';
import {
  CanvasConfigContainerBar,
  SaveButton,
  PublishButton,
  CenterButton,
} from "./CanvasConfigBar.styles";
import { IconFocus2 } from "@tabler/icons-react";

const CanvasConfigBar = () => {
  const { resetPosition } = useCanvas();

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving...");
  };

  const handlePublish = () => {
    // TODO: Implement publish functionality
    console.log("Publishing...");
  };

  return (
    <CanvasConfigContainerBar>
      <SaveButton onClick={handleSave}>Save</SaveButton>
      <PublishButton onClick={handlePublish}>Publish</PublishButton>
      <CenterButton onClick={resetPosition}>
        <IconFocus2 size={18} />
      </CenterButton>
    </CanvasConfigContainerBar>
  );
};

export default CanvasConfigBar;
