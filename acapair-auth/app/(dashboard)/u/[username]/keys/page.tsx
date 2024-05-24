import UrlCard from "./_components/url-card";
import { currentUser } from "@/lib/auth";
import { getStreamByUserId } from "@/data/stream-service";
import KeyCard from "./_components/key-card";
import ConnectModal from "./_components/connect-modal";
import { Button } from "@/components/ui/button";
import { createStream } from "@/data/user";

const KeysPage = async () => {
  const user = await currentUser();
  const stream = await getStreamByUserId(user?.id);

  if (!stream) {
    return (
      <div className="p-3 text-white">Yayın yapmak için kanal bulunamadı.</div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Anahtarlar ve URLs</h1>
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
