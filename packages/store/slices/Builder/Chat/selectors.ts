import { RootState } from "../../../store";

export const selectChatConfig = (state: RootState) => state.builder.chat.config;
