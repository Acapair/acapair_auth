import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 mb-2 shadow-lg">
          <p className="text-sm font-medium">Kullanıcı Kimliği</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 mb-2 shadow-lg">
          <p className="text-sm font-medium">İsim</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 mb-2 shadow-lg">
          <p className="text-sm font-medium">E-posta</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 mb-2 shadow-lg">
          <p className="text-sm font-medium">Kullanıcı Tipi</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
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
