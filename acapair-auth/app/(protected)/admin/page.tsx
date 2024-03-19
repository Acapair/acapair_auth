import ListUser from "@/components/auth/list-users";
import { getAllUsers } from "@/data/user";
const AdminPage = async () => {
  const users = await getAllUsers(5);

  return (
    <div>
      <ListUser users={users} />
    </div>
  );
};

export default AdminPage;
