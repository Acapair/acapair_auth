import ListUser from "@/components/auth/list-users";
import SearchBar from "@/components/auth/search-bar";

const AdminPage = async () => {
  return (
    <div className="flex-row items-center justify-center bg-white p-10 rounded-xl w-[680px]">
      <SearchBar />
    </div>
  );
};

export default AdminPage;
