"use server";
import UserInfo from "@/components/auth/user-info";
import { Button } from "@/components/ui/button";
import { deleteUserById, getUserById } from "@/data/user";
import { currentRole } from "@/lib/auth";
import { redirect } from "next/navigation";

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

  const handleClick = async () => {
    //@ts-ignore
    await deleteUserById(id);
    redirect("/admin");
  };

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
