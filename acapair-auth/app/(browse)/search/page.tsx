import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Results, ResultsSkeleton } from "../home/_components/results";

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  if (!searchParams.term) {
    redirect("/");
  }
  console.log(searchParams);
  return (
    <div className="mx-auto h-full max-w-screen-2xl p-8">
      <Suspense fallback={<ResultsSkeleton />}>
        {
          //@ts-ignore
          <Results term={searchParams.term} />
        }
      </Suspense>
    </div>
  );
};

export default SearchPage;
