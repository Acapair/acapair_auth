"use client";

import qs from "query-string";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { term: value },
      },
      { skipEmptyString: true },
    );

    router.push(url);
  };

  const onClear = () => {
    setValue("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex w-full items-center pl-5 sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[500px]"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Arama yapın..."
        className="border-1 rounded-r-none border border-slate-500 bg-[#252731] text-white hover:bg-slate-900 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        id="search"
      />
      {value && (
        <X
          className="absolute right-12 top-2.5 h-5 w-5 cursor-pointer text-muted-foreground transition hover:opacity-75"
          onClick={onClear}
        />
      )}
      <Button
        type="submit"
        size="icon"
        className="rounded-l-none bg-[#252731] hover:bg-slate-900"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground " />
      </Button>
    </form>
  );
};
