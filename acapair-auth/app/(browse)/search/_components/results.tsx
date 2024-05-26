import { getSearch } from "@/lib/search-service";
import { Skeleton } from "@/components/ui/skeleton";
import { ResultCard, ResultCardSkeleton } from "./results-card";

interface ResultsProps {
  term?: string;
}

export const Results = async ({ term }: ResultsProps) => {
  const data = await getSearch(term);

  return (
    <div className="text-white">
      <h2 className="mb-4 text-lg font-semibold">
        &quot;{term}&quot; için listelenen sonuçlar
      </h2>
      {data.length === 0 && (
        <p className="text-sm text-gray-400">
          Herhangi bir sonuç bulunamadı. Lütfen başka bir arama yapın.
        </p>
      )}
      <div className="flex flex-col gap-y-4">
        {data.map((result) => (
          <ResultCard data={result} key={result.id} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-4 h-8 w-[290px]" />
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
