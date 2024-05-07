import StreamPlayer from "@/components/stream/stream-player";
import { getUserByUsername } from "@/data/user";
import { currentUser } from "@/lib/auth";
import axios from "axios";
import { redirect } from "next/navigation";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const curUser = await currentUser();
  if (!curUser) {
    redirect("/login");
  }
  //@ts-ignore
  const user = await getUserByUsername(params.username);

  const isFollowing = axios.get(
    `https://tahinli.com.tr:3434/is-follower/${curUser?.name}/${user?.name}`,
  );

  return (
    <div className="h-full">
      <StreamPlayer
        user={user}
        stream={user?.stream}
        isFollowing={isFollowing}
      />
    </div>
  );
};

export default CreatorPage;
