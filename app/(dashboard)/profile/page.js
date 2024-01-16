import { UserProfile } from "@clerk/nextjs";

const Profile = () => {
  return (
    <div className="mt-4">
      <UserProfile />
    </div>
  );
};

export default Profile;
