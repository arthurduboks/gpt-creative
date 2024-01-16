import { fetchUserToken } from "@/utils/action";
import { UserProfile, auth } from "@clerk/nextjs";

const Profile = async () => {
  const { userId } = auth();
  const currentTokens = await fetchUserToken(userId);
  return (
    <div className="mt-4">
      <h2 className="inline-block mb-8 ml-8 text-xl font-extrabold text-primary bg-base-100 p-4 rounded-lg shadow-lg">
        Tokens : {currentTokens}
      </h2>
      <UserProfile />
    </div>
  );
};

export default Profile;
