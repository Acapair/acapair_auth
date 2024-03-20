"use server";
import UserInfo from "@/components/auth/user-info";
import { Button } from "@/components/ui/button";
import { deleteUserById, getUserById } from "@/data/user";
import { currentRole } from "@/lib/auth";
import dynamic from "next/dynamic";
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
          <div className="w-[680px] mt-3">
            <h1 className="text-red-200 text-semibold text-lg shadow-sm p-1">
              Tehlikeli Alan
            </h1>
            <div className="border border-red-600 rounded-xl  p-1">
              {role === "ADMIN" &&
                (user?.role === "ADMIN" ? (
                  <p className="text-sm text-center text-white">
                    Yönetici hesapları silinemez.
                  </p>
                ) : (
                  <Button variant="danger" className="w-full">
                    Kullanıcıyı Sil
                  </Button>
                ))}
            </div>
          </div>
        </div>
      ) : (
        "Kullanıcı bulunamadı"
      )}
    </div>
  );
}
