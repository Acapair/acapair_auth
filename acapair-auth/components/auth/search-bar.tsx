"use client";
import { searchUser } from "@/actions/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import UserInfo from "./user-info";
import ListUserItem from "./list-user-item";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<Object | null>(null);

  const onTextChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleClick = () => {
    startTransition(() => {
      searchUser(search).then((data) => {
        console.log(data);
        setUser(data);
      });
      setSearch("");
    });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-center mb-5 text-bold text-xl shadow-sm p-3 text-slate-700">
        Kullanıcı Ara
      </h1>
      <div className="flex items-center space-x-2 mb-5 justify-center">
        <Input
          type="email"
          placeholder="Kullanıcı ara (e-posta giriniz.)"
          onChange={onTextChange}
          value={search}
          className="w-96 p-2 rounded-md border-2 border-slate-300 shadow-md focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all ease-in-out duration-200"
        />
        <Button type="submit" onClick={handleClick} disabled={isPending}>
          Ara
        </Button>
      </div>
      <div>
        {user ? (
          <ListUserItem user={user} />
        ) : (
          <p className="text-center">Kullanıcı bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
