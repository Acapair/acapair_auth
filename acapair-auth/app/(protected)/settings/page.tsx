import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      Settings Page <p>{JSON.stringify(session)}</p>
      <form
        action={async (e) => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
