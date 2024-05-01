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

  if (user?.id !== curUser?.id || user?.stream) {
    <div>Erişim izni yok.</div>;
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user?.stream} />
      <p>
        <div></div>
      </p>
    </div>
  );
};

export default CreatorPage;
