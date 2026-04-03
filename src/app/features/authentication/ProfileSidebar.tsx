import type { User } from "@/api/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileForm from "./ProfileForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";

type ProfileSidebar = {
  user: User;
};

const defaultAvatar = "default-user.jpg";

export default function ProfileSidebar({ user }: ProfileSidebar) {
  const [editing, setEditing] = useState(false);

  const avatar = user.avatar;

  return (
    <div className="flex h-full w-full flex-col gap-3">
      <div>
        <Avatar className="size-66 justify-self-center">
          {/* grayscale */}
          <AvatarImage
            src={avatar || defaultAvatar}
            alt="User Avatar"
            className="object-cover"
          />
          <AvatarFallback>User Avatar</AvatarFallback>
        </Avatar>
      </div>

      <AnimatePresence>
        <motion.div className="flex flex-col gap-3" layout>
          {!editing && (
            <motion.div
              key="username"
              className="text-lg font-medium text-accent-foreground capitalize"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {user.userName}
            </motion.div>
          )}

          {!editing && (
            <Button
              variant="outline"
              size="sm"
              className="active:translate-y-0.5"
              onClick={() => setEditing((prev) => !prev)}
            >
              Edit Profile
            </Button>
          )}

          {editing && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProfileForm user={user} setEditing={setEditing} />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
