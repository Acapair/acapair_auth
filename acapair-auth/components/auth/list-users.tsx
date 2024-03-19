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
        <p className="text-2xl font-semibold text-center">
          Kayıtlı Kullanıcıların Bilgileri
        </p>
      </CardHeader>
      {Array.isArray(users) &&
        users.map((user: any) => {
          return <ListUserItem key={user.id} user={user} />;
        })}
    </Card>
  );
};

export default ListUser;
