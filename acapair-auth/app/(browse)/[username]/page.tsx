import { getUserByUsername } from "@/data/user";
import { currentUser } from "@/lib/auth";
import axios from "axios";
import { Actions } from "./_components/actions";
import { Block } from "./_components/block";
import StreamPlayer from "@/components/stream/stream-player";
import { revalidatePath } from "next/cache";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = params;
  const user = await getUserByUsername(username);
  const curUser = await currentUser();

  const isFollowing = await axios
    .get(
      `https://tahinli.com.tr:3434/is-follower/${curUser?.name}/${user?.name}`,
    )
    .then((res) => {
      return res.data.is_follower;
    });

  const isBanned = await axios
    .get(`https://tahinli.com.tr:3434/is-banned/${user?.name}/${curUser?.name}`)
    .then((res) => {
      return res.data.is_banned;
    });

  if (!user || !user.stream || isBanned) {
    return <h1>Kullanıcı Bulunamadı</h1>;
  }
  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
  );
};

export default UserPage;
