import { Logo } from "./logo";
import { Search } from "./search";
import { Actions } from "./actions";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 z-[49]  flex h-20 w-full items-center justify-between bg-[#252731] px-2 shadow-sm lg:px-4">
      <Logo />
      <div className="ml-32">
        <Search />
      </div>
      <Actions />
    </nav>
  );
};
