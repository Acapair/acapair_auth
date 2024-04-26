import { getUserById, getUserByUsername } from "@/data/user";
import { currentUser } from "@/lib/auth";
import ToggleCard from "./_components/toggle-card";

const ChatPage = async () => {
  const user = await currentUser();
  let userInfo;
  if (user && user.name) {
    userInfo = await getUserByUsername(user.name);
  }

  console.log(userInfo?.stream);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Sohbet Ayarları</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable Chat"
          value={userInfo?.stream?.isChatEnabled}
        />
      </div>
    </div>
  );
};

export default ChatPage;
