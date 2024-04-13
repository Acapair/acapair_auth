import SearchBar from "@/components/auth/search-bar";
import { currentRole } from "@/lib/auth";

const AdminPage = async () => {
  const role = await currentRole();
  if (role !== "ADMIN") {
    return (
      <div className="text-bold mt-5 text-xl text-white">
        Erişim izniniz yok.
      </div>
    );
  }
  return (
    <div className="w-[680px] flex-row items-center justify-center rounded-xl bg-white p-10">
      <SearchBar />
    </div>
  );
};

export default AdminPage;
