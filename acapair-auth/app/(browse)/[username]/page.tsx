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
  /*
  const isFollowing = await axios
    .get(`https://tahinli.com.tr:3434/search-username/${user.name}`)
    .then((res) => {
      return res.data;
    });
*/
  return (
    <div className="flex flex-col gap-y-4">
      <p>username: {user.name}</p>
      <p>Current User: {curUser?.email}</p>
      <p>is following: true</p>
      {user?.name !== curUser?.name && (
        <Actions isFollowing={true} user={user} curUser={curUser} />
      )}
    </div>
  );
};

export default UserPage;
