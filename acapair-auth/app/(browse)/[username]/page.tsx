import { getUserByUsername } from "@/data/user";
import { currentUser } from "@/lib/auth";
import axios from "axios";
import { Actions } from "./_components/actions";
import { Block } from "./_components/block";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = params;
  const user = await getUserByUsername(username);
  const curUser = await currentUser();

  if (!user) {
    return <h1>User not found</h1>;
  }

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

  console.log(isBanned);
  return (
    <div className="flex flex-col gap-y-4">
      <div>
        {user?.name}
        {user?.email}
        {isFollowing}
        {isBanned}
      </div>
      {user?.name !== curUser?.name && (
        <div className="flex flex-col gap-y-2">
          <Actions isFollowing={isFollowing} user={user} curUser={curUser} />
          <Block isBanned={isBanned} user={user} curUser={curUser} />
        </div>
      )}
    </div>
  );
};

export default UserPage;
