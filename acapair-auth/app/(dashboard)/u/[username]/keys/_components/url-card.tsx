import { Input } from "@/components/ui/input";
import CopyButton from "./copy-button";

interface UrlCardProps {
  value: string | null;
}

const UrlCard = ({ value }: UrlCardProps) => {
  return (
    <div className="rounded-xl bg-gray-900 p-6 text-white">
      <div className="flex items-center gap-x-10">
        <p className="shrink-0 font-semibold">Server URL</p>
        <div className="w-full space-y-2">
          <div className="ga-x-2 flex w-full items-center">
            <Input value={value || ""} disabled placeholder="Server URL" />
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlCard;
