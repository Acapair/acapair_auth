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

  const user = await getUserByUsername(decodeURI(params.username));

  const curUserName = encodeURIComponent(curUser?.name || "");
  const userName = encodeURIComponent(user?.name || "");

  const isFollowing = axios
    .get(`https://tahinli.com.tr:3434/is-follower/${curUserName}/${userName}`)
    .then((response) => {
      return response.data.is_follower;
    })
    .catch((error) => console.error(error));

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
