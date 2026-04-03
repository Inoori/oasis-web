import { useAuthStore } from "@/store/authStore";
import ProfileSidebar from "./ProfileSidebar";

export default function EditProfile() {
  const user = useAuthStore((state) => state.user)!;

  return (
    <section className="grid grid-cols-[22rem_1fr] pt-6">
      <ProfileSidebar user={user} />
      <div className="text-3xl font-medium tracking-tight">
        More features coming soon...
      </div>
    </section>
  );
}
