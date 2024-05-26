"use client";
import { searchUser } from "@/actions/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
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
        setUser(data);
      });
      setSearch("");
    });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-bold mb-1 p-3 text-center text-xl text-slate-700 shadow-sm">
        🔎 Kullanıcı Ara
      </h1>
      <div className="mb-5 flex items-center justify-center space-x-2">
        <Input
          type="email"
          placeholder="Kullanıcı ara (e-posta giriniz.)"
          onChange={onTextChange}
          value={search}
          className="w-96 rounded-md border-2 border-slate-300 p-2 shadow-md transition-all duration-200 ease-in-out focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-300"
        />
        <Button type="submit" onClick={handleClick} disabled={isPending}>
          Ara
        </Button>
      </div>
      <div>
        {user ? (
          <ListUserItem user={user} />
        ) : (
          <p className="text-center">Kullanıcı Bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
