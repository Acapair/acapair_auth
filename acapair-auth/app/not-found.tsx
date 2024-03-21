import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex justify-center text-center items-center h-full w-full">
      <div>
        <h1 className="mb-4 text-5xl font-semibold">404</h1>
        <p>Aradığınız sayfa bulunamadı.</p>
        <Link href="/" className="text-blue-600">
          geri dön
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
