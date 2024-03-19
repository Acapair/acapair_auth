import ListUser from "@/components/auth/list-users";
import { getAllUsers } from "@/data/user";
import { useCurrentRole } from "@/hooks/use-current-role";
import { currentRole } from "@/lib/auth";

const AdminPage = async () => {
  const role = await currentRole();
  if (role !== "ADMIN") {
    return (
      <div className="text-white text-xl text-bold mt-5">
        Erişim izniniz yok.
      </div>
    );
  }
  const users = await getAllUsers(5);
  return (
    <div>
      <ListUser users={users} />
    </div>
  );
};

export default AdminPage;
