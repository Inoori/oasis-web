import AsyncBoundary from "@/components/AsyncBoundary";
import EditProfile from "@/features/authentication/EditProfile";

export default function Profile() {
  return (
    <>
      <h1 className="text-3xl font-bold">Edit Profile</h1>

      <AsyncBoundary>
        <EditProfile />
      </AsyncBoundary>
    </>
  );
}
