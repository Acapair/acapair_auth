import { Skeleton } from "@/components/ui/skeleton";

import { ResultCard, ResultCardSkeleton } from "./result-card";
import { getStreams } from "@/lib/feed-service";

export const Results = async () => {
  const data = await getStreams();

  return (
    <div>
      <div className="pb-5">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Öne Çıkan Canlı Yayınlar
        </h2>
        {data.length === 0 && (
          <div className="text-sm text-muted-foreground">
            Herhangi bir yayın bulunamadı.
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.map((result) => (
            <ResultCard key={result.id} data={result} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-4 h-8 w-[290px]" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
