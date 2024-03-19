import SearchBar from "@/components/auth/search-bar";
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
  return (
    <div className="flex-row items-center justify-center bg-white p-10 rounded-xl w-[680px]">
      <SearchBar />
    </div>
  );
};

export default AdminPage;
