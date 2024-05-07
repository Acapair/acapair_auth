import { create } from "zustand";

export enum ChatVariant {
  CHAT = "SOHBET",
  COMMUNITY = "TOPLULUK",
}

interface ChatSidebarStore {
  collapsed: boolean;
  variant: ChatVariant;
  onExpand: () => void;
  onCollapse: () => void;
  onChangeVariant: (varient: ChatVariant) => void;
}

export const useChatSidebar = create<ChatSidebarStore>((set: any) => ({
  collapsed: false,
  variant: ChatVariant.CHAT,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
  onChangeVariant: (varient: ChatVariant) => set(() => ({ varient })),
}));
