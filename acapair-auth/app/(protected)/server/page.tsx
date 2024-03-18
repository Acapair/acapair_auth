import UserInfo from "@/components/auth/user-info";
import { currentUser } from "@/lib/auth";

const Server = async () => {
  const user = await currentUser();
  return (
    <div>
      <UserInfo label="Server" user={user} />
    </div>
  );
};
export default Server;
