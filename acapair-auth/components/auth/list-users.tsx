"use client";

import ListUserItem from "@/components/auth/list-user-item";
import { Card, CardHeader } from "../ui/card";

interface ListUserProps {
  users: any;
}

const ListUser = ({ users }: ListUserProps) => {
  return (
    <Card className="w-[680px] shadow-md">
      <CardHeader>
        <h1 className="text-center mb-5 text-bold text-xl shadow-sm p-3 text-slate-700">
          🌐 Kayıtlı Kullanıcıların Bilgileri
        </h1>
      </CardHeader>
      {Array.isArray(users) &&
        users.map((user: any) => {
          return <ListUserItem key={user.id} user={user} />;
        })}
    </Card>
  );
};

export default ListUser;
