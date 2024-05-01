import { currentUser } from "@/lib/auth";
import ToggleCard from "./_components/toggle-card";
import { getStreamByUserId } from "@/data/stream-service";

const ChatPage = async () => {
  const user = await currentUser();
  const stream = await getStreamByUserId(user?.id);

  if (!stream) {
    return (
      <div className="p-3 text-white">
        Sohbeti ayarı yapılacak bir yayın bulunamadı.
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Sohbet Ayarları</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Sohbeti aç veya kapat"
          value={stream?.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Sohbeti gecikmesini aç veya kapat"
          value={stream?.isChatDelayed}
        />
        <ToggleCard
          field="isChatFolloweOnly"
          label="Sohbeti abone olanlara aç veya kapat"
          value={stream?.isChatFolloweOnly}
        />
      </div>
    </div>
  );
};

export default ChatPage;
