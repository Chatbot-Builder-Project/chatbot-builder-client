import { Canvas } from "../../components/Builder/Canvas";
import { CustomChatEditor } from "../../components/CustomChatEditor";

const CHAT_DIMENSIONS = {
  width: 6000,
  height: 4000,
};

export const ChatBuilder: React.FC = () => {
  return (
    <Canvas dimensions={CHAT_DIMENSIONS}>{() => <CustomChatEditor />}</Canvas>
  );
};
