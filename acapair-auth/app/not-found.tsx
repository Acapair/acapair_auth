import Navbar from "@/components/navbar";
import Link from "next/link";
import { GoAlertFill } from "react-icons/go";

const NotFound = () => {
  return (
    <div className="flex-row justify-center items-center h-full w-full bg-gradient-to-r from-slate-500 to-slate-900">
      <div className="py-1">
        <Navbar />
      </div>
      <GoAlertFill className="mx-auto py-auto mt-28 w-64 h-64 text-red-500" />
      <div className="text-center">
        <h1 className="mb-4 text-7xl font-semibold text-red-500 mt-5">404</h1>
        <p className="mb-4 text-2xl text-gray-900">
          Aradığınız sayfa bulunamadı.
        </p>
        <p className="mt-4 text-xl text-gray-900">
          Ana sayfaya{" "}
          <Link
            href="/"
            className="text-slate-400 hover:text-slate-100 hover:ease-in-out duration-150 transition"
          >
            geri dön.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
