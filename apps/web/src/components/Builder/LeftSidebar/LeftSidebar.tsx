import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NodeType } from "@chatbot-builder/store/slices/Builder/Nodes/types";
import { NODES } from "../Nodes/nodes";
import { LeftSidebarContainer, NodesContainer } from "./LeftSidebar.styles";
import { SidebarNode } from "./SidebarNode";

const LeftSidebar: React.FC = () => {
  return (
    <LeftSidebarContainer>
      <Accordion
        defaultExpanded
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          padding: 0,
          width: "100%",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
          sx={{
            minHeight: "48px !important",
            maxHeight: "48px",
            "& .MuiAccordionSummary-content": {
              margin: "0 !important",
            },
          }}
        >
          <Typography color="#ffffff">Available Nodes</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ backgroundColor: "transparent", boxShadow: "none", padding: 0 }}
        >
          <NodesContainer>
            {Object.entries(NODES).map(([nodeType, value]) => (
              <SidebarNode
                key={nodeType}
                nodeType={nodeType as NodeType}
                nodeDetails={value}
              />
            ))}
          </NodesContainer>
        </AccordionDetails>
      </Accordion>
    </LeftSidebarContainer>
  );
};

export default LeftSidebar;
