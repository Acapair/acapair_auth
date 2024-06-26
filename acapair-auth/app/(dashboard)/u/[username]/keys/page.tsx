import UrlCard from "./_components/url-card";
import { currentUser } from "@/lib/auth";
import { getStreamByUserId } from "@/data/stream-service";
import KeyCard from "./_components/key-card";
import ConnectModal from "./_components/connect-modal";
import CreateStream from "./_components/create-stream";

const KeysPage = async () => {
  const user = await currentUser();
  const stream = await getStreamByUserId(user?.id);

  if (!stream) {
    return (
      <div className="p-3 text-white">
        <CreateStream name={`${user?.name} Yayını`} user={user} id={user?.id} />
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Anahtarlar ve URL</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream?.serverUrl} />
        <KeyCard value={stream?.streamKey} />
      </div>
    </div>
  );
};

export default KeysPage;
