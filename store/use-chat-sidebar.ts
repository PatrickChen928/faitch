import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

type ChatSidebarState = {
  isOpen: boolean;
  variant: ChatVariant;
  open: () => void;
  close: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
};

export const useChatSidebar = create<ChatSidebarState>((set) => ({
  isOpen: false,
  variant: ChatVariant.CHAT,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  onChangeVariant: (variant) => set({ variant }),
}));