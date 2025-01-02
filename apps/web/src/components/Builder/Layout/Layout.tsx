import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LeftSidebar } from "../LeftSidebar";
import { Outlet } from "react-router-dom";

const BuilderLayout: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <LeftSidebar />
      <Outlet />
    </DndProvider>
  );
};

export default BuilderLayout;
