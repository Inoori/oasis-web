import ProfileSidebar from "./ProfileSidebar";
import { useUser } from "./useUser";

export default function EditProfile() {
  const { data: user } = useUser();

  return (
    <section className="grid grid-cols-[22rem_1fr] pt-6">
      <ProfileSidebar user={user} />
      <div className="text-3xl font-medium tracking-tight">
        More features coming soon...
      </div>
    </section>
  );
}
