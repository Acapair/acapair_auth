"use client";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { useCurrentUser } from "@/hooks/use-current-user";

interface UserInfoProps {
  user?: any;
  label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
  const currentUser = useCurrentUser();

  return (
    <Card className="w-[680px] shadow-md">
      <CardHeader>
        <h1 className="text-bold mb-1 pb-1 text-center text-xl text-slate-700 shadow-sm">
          {label}{" "}
        </h1>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
          <p className="text-sm font-medium">Kullanıcı Kimliği</p>
          <p className="max-w-[200px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
            {user?.id}
          </p>
        </div>
        <div className="mb-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
          <p className="text-sm font-medium">İsim</p>
          <p className="max-w-[200px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
            {user?.name}
          </p>
        </div>
        <div className="mb-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
          <p className="text-sm font-medium">E-posta</p>
          <p className="max-w-[200px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
            {user?.email}
          </p>
        </div>
        <div className="mb-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
          <p className="text-sm font-medium">Kullanıcı Tipi</p>
          <p className="max-w-[200px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
            {user?.role === "ADMIN" ? "Yönetici" : "Kullanıcı"}
          </p>
        </div>
        <div className="mb-2 flex flex-row items-center justify-between rounded-lg border p-3 shadow-lg">
          <p className="text-sm font-medium">İki Faktörlü Kimlik Doğrulama</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "Açık" : "Kapalı"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
