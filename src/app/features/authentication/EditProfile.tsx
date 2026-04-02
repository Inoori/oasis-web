import ProfileForm from "./ProfileForm";
import ProfileSidebar from "./ProfileIcon";
import { useUser } from "./useUser";

export default function EditProfile() {
  const { data: user } = useUser();

  return (
    <section className="pt-6 grid grid-cols-[22rem_1fr]">
      <ProfileSidebar user={user} />
      <ProfileForm user={user} />
    </section>
  );
}
