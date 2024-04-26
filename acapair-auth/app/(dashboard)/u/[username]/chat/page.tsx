import { currentUser } from "@/lib/auth";
import ToggleCard from "./_components/toggle-card";
import { getStreamByUserId } from "@/data/stream-service";

const ChatPage = async () => {
  const user = await currentUser();
  const stream = await getStreamByUserId(user?.id);

  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Sohbet Ayarları</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Sohbeti Aç/Kapat"
          value={stream?.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Sohbeti Geciktirme Aç/Kapat"
          value={stream?.isChatDelayed}
        />
        <ToggleCard
          field="isChatFolloweOnly"
          label="Abone Olanlara Sohbeti Aç/Kapat"
          value={stream?.isChatFolloweOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
