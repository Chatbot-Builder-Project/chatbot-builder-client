import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { ChatComponent, setSelectedComponent } from "@chatbot-builder/store/slices/Builder/Chat";

interface SelectionLayerProps {
  component: ChatComponent;
  children: React.ReactNode;
}

export const SelectionLayer: React.FC<SelectionLayerProps> = ({ component, children }) => {
  const dispatch = useDispatch();

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setSelectedComponent(component));
      }}
      sx={{
        position: "relative",
        "&:hover": {
          outline: "2px dashed #2196f3"
        }
      }}
    >
      {children}
    </Box>
  );
};
