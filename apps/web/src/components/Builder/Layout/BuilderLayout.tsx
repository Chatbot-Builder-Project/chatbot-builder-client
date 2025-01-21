import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Layout } from "./index";
import { CanvasProvider } from "../../../contexts/CanvasContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CanvasConfigBar } from "../CanvasConfigBar";
import { ItemConfigSidebar } from "../ItemConfigSidebar";

const BuilderLayout: React.FC = () => {
  const location = useLocation();
  const mode = location.pathname.includes("/builder/flow") ? "flow" : "chat";

  return (
    <DndProvider backend={HTML5Backend}>
      <CanvasProvider>
        <Layout mode={mode}>
          <Outlet />
          <ItemConfigSidebar />
          <CanvasConfigBar />
        </Layout>
      </CanvasProvider>
    </DndProvider>
  );
};

export default BuilderLayout;
