

const UserAvatar: React.FC = () => {
  // const { user: { user_metadata: { fullName, avatar } = {} } = {} } = useUser();

  const avatar = "default-user.jpg";
  const fullName = "UserAvatar";

  return (
    <div className="flex gap-5 items-center font-medium text-sm text-grey-600">
      <img
        src={avatar}
        alt={fullName || "User Avatar"}
        className="block w-9 aspect-square object-cover object-center rounded-full outline-2 outline-grey-100"
      />
      <span>{fullName}</span>
    </div>
  );
};

export default UserAvatar;