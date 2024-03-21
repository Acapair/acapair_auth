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
        <h1 className="text-bold mb-1 p-3 text-center text-xl text-slate-700 shadow-sm">
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
