import StreamPlayer from "@/components/stream/stream-player";
import { getUserByUsername } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const curUser = await currentUser();
  if (!curUser) {
    redirect("/");
  }
  //@ts-ignore
  const user = await getUserByUsername(curUser?.name);

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user?.stream} />
    </div>
  );
};

export default CreatorPage;
