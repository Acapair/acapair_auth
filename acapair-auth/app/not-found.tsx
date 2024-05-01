import Navbar from "@/components/auth/navbar-app";
import Link from "next/link";
import { GoAlertFill } from "react-icons/go";

const NotFound = () => {
  return (
    <div className="h-full w-full flex-row items-center justify-center  bg-[#242731]">
      <div className="py-1">
        <Navbar />
      </div>
      <GoAlertFill className="py-auto mx-auto mt-28 h-64 w-64 text-red-500" />
      <div className="text-center">
        <h1 className="mb-4 mt-5 text-7xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-2xl text-gray-400">
          Aradığınız sayfa bulunamadı.
        </p>
        <p className="mt-4 text-xl text-gray-400">
          Ana sayfaya{" "}
          <Link
            href="/home"
            className="text-blue-600 underline transition duration-150 hover:text-slate-100 hover:ease-in-out"
          >
            geri dön.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
