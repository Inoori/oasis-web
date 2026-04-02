import type { User } from "@/api/user";

type ProfileFormProps = {
  user: User;
};

export default function ProfileForm({ user }: ProfileFormProps) {
  return (
    <div>
      <form>
        <div>{user.userName}</div>
      </form>
    </div>
  );
}
