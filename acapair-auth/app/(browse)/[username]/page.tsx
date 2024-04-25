import { getUserByUsername } from "@/data/user";
import { currentUser } from "@/lib/auth";
import axios from "axios";
import { Actions } from "./_components/actions";

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

  const isFollowing = axios
    .get(
      `https://tahinli.com.tr:3434/is-follower/${curUser?.name}/${user?.name}`,
    )
    .then((res) => {
      return res.data.is_follower;
    });

  return (
    <div className="flex flex-col gap-y-4">
      {user?.name !== curUser?.name && (
        <Actions isFollowing={false} user={user} curUser={curUser} />
      )}
    </div>
  );
};

export default UserPage;
