import { fetchOrGenTokens } from "@/utils/action";
import { UserButton, auth, currentUser } from "@clerk/nextjs";

const UserProfile = async () => {
  const user = await currentUser();
  const { userId } = auth();
  await fetchOrGenTokens(userId);
  return (
    <div className="px-4 flex items-center gap-2">
      <UserButton afterSignOutUrl="/" />
      <p>{user.emailAddresses[0].emailAddress}</p>
    </div>
  );
};

export default UserProfile;
