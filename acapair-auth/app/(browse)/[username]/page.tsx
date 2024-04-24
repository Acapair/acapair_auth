import { getUserByUsername } from "@/data/user";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = params;
  const user = await getUserByUsername(username);

  if (!user) {
    return <h1>User not found</h1>;
  }

  // is following "true" or "false"?

  return (
    <div>
      <h1>{user.email}</h1>
    </div>
  );
};

export default UserPage;
