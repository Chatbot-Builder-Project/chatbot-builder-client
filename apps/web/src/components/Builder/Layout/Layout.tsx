import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LeftSidebar } from "../LeftSidebar";
import { Outlet } from "react-router-dom";
import { ItemConfigSidebar } from "../ItemConfigSidebar";
import { CanvasConfigBar } from "../CanvasConfigBar";
import { CanvasProvider } from "../../../contexts/CanvasContext";
import { Xwrapper } from "react-xarrows";

const BuilderLayout: React.FC = () => {
  return (
    <Xwrapper>
      <CanvasProvider>
        <DndProvider backend={HTML5Backend}>
          <LeftSidebar />
          <Outlet />
          <ItemConfigSidebar />
          <CanvasConfigBar />
        </DndProvider>
      </CanvasProvider>
    </Xwrapper>
  );
};

export default BuilderLayout;
