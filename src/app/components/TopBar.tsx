import UserAvatar from "@/features/authentication/UserAvatar";
import AsyncBoundary from "./AsyncBoundary";
import { UserIcon } from "lucide-react";

export default function TopBar() {
  return (
    <header className="flex min-h-12 max-w-full flex-row items-center justify-end p-2">
      <div className="flex">
        <AsyncBoundary fallback={<UserIcon />}>
          <UserAvatar />
        </AsyncBoundary>
      </div>
    </header>
  );
}
