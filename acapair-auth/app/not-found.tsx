import Link from "next/link";
import { GoAlertFill } from "react-icons/go";

const NotFound = () => {
  return (
    <div className="text-center">
      <GoAlertFill className="mx-auto mt-10 w-64 h-64 text-red-500" />
      <h1 className="mb-4 text-7xl font-semibold text-red-500 mt-5">404</h1>
      <p className="mb-4 text-lg text-gray-900">Aradığınız sayfa bulunamadı.</p>
      <p className="mt-4 text-gray-900">
        Ana sayfaya{" "}
        <Link
          href="/"
          className="text-slate-400 hover:text-slate-100 hover:ease-in-out duration-150 transition"
        >
          geri dön.
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
