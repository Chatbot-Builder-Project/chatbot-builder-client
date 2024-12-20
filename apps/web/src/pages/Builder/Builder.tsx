import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Canvas } from "../../components/Builder/Canvas";
import { BuilderLayout } from "../../components/Builder/Layout";

const Builder: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BuilderLayout />
      <Canvas />
    </DndProvider>
  );
};

export default Builder;
