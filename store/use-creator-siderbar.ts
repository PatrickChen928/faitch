import { create } from "zustand";

type CreatorSidebarState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useCreatorSidebar = create<CreatorSidebarState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));