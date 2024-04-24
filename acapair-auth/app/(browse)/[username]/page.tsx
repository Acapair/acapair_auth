import { getUserByUsername } from "@/data/user";
import { currentUser } from "@/lib/auth";
import axios from "axios";

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

  // is following "true" or "false"?
  /*
  const following = await axios.get(
    `https://tahinli.com.tr:3434/search-username/${user.name}`,
  );
 */

  return (
    <div>
      <h1>
        <p>User Page: {user.email}</p>
        <p>Current User: {curUser?.email}</p>
      </h1>
    </div>
  );
};

export default UserPage;
