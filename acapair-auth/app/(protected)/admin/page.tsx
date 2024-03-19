import ListUser from "@/components/auth/list-users";
import { deleteUserById, getAllUsers } from "@/data/user";

const AdminPage = async () => {
  const users = await getAllUsers(5);
  return (
    <div className="bg-white p-10 rounded-xl">
      <ListUser users={users} />
    </div>
  );
};

export default AdminPage;
