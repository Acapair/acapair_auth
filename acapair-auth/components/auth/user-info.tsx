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
        <h1 className="text-center mb-5 text-bold text-xl shadow-sm pb-1 text-slate-700">
          {label}{" "}
        </h1>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 mb-2 shadow-lg">
          <p className="text-sm font-medium">Kullanıcı Kimliği</p>
          <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 mb-2 shadow-lg">
          <p className="text-sm font-medium">İsim</p>
          <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 mb-2 shadow-lg">
          <p className="text-sm font-medium">E-posta</p>
          <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 mb-2 shadow-lg">
          <p className="text-sm font-medium">Kullanıcı Tipi</p>
          <p className="truncate text-xs max-w-[200px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role === "ADMIN" ? "Yönetici" : "Kullanıcı"}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 mb-2 shadow-lg">
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
