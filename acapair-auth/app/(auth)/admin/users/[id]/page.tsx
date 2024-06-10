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
      <div className="text-bold mt-5 text-xl text-white">
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
          <div className="mt-3 w-[680px]">
            <h1 className="text-semibold p-1 text-lg text-red-200 shadow-sm">
              Tehlikeli Alan
            </h1>
            <div className="rounded-xl border border-red-600  p-1">
              {role === "ADMIN" &&
                (user?.role === "ADMIN" ? (
                  <p className="text-center text-sm text-white">
                    Yönetici hesapları silinemez.
                  </p>
                ) : (
                  <p className="text-center text-sm text-white">
                    Hesabı silmek için iletişime geçin.
                    <br />
                    <span className="text-blue-300">
                      acapair@acapair.com.tr
                    </span>
                  </p>
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
