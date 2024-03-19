import UserInfo from "@/components/auth/user-info";
import { getUserById } from "@/data/user";

export default async function UserPage({
  params,
}: Readonly<{ params: { id: string } }>) {
  const user = await getUserById(params.id);
  return (
    <div>
      {user ? (
        //@ts-ignore
        <UserInfo user={user} label={"Kullanıcı Bilgisi"} />
      ) : (
        "Kullanıcı bulunamadı"
      )}
    </div>
  );
}
