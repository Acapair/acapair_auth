"use server";
import UserInfo from "@/components/auth/user-info";
import { getUserById } from "@/data/user";
import { currentRole } from "@/lib/auth";

export default async function UserPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const role: "ADMIN" | "USER" | undefined = await currentRole();
  if (role !== "ADMIN") {
    return (
      <div className="text-white text-xl text-bold mt-5">
        Erişim izniniz yok.
      </div>
    );
  }
  const user = await getUserById(params.id);

  return (
    <div>
      {user ? (
        //@ts-ignore
        <div>
          <UserInfo user={user} label={"Kullanıcı Bilgisi"} />
        </div>
      ) : (
        "Kullanıcı bulunamadı"
      )}
    </div>
  );
}
