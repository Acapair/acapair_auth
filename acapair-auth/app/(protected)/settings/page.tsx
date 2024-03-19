import ListUser from "@/components/auth/list-users";
import { deleteUserById, getAllUsers } from "@/data/user";

const SettingsPage = async () => {
  const onDeleteClick = async () => {
    // @ts-ignore
    await deleteUserById(user?.id);
  };
  const users = await getAllUsers(5);
  return <div className="bg-white p-10 rounded-xl"></div>;
};

export default SettingsPage;
