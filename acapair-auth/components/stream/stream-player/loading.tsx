import { Loader } from "lucide-react";

interface LoadingVideoProps {
  label: string;
}

const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Loader className="h-10 w-10 animate-spin text-muted-foreground" />
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};

export default LoadingVideo;
