import { Wrapper } from "./wrapper";
import { Toggle } from "./toggle";
import Following from "./following";
import { currentUser } from "@/lib/auth";
import axios from "axios";

export const Sidebar = async () => {
  const curUser = await currentUser();

  const data = await axios
    .get(`https://tahinli.com.tr:3434/search-username/${curUser?.name}`)
    .then((res) => {
      return res.data.channel.followed_list;
    });

  const abc = await Promise.all(
    data.map(async (item: any) => {
      const response = await axios.get(
        `https://tahinli.com.tr:3434/search-id/${item.String}`,
      );
      return response.data.channel.username;
    }),
  );

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={abc} />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60">
      <Toggle />
    </aside>
  );
};
