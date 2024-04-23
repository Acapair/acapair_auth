import { Wrapper } from "./wrapper";
import { Toggle, ToggleSkeleton } from "./toggle";

export const Sidebar = async () => {
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0"></div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60">
      <ToggleSkeleton />
    </aside>
  );
};
