const UserAvatar: React.FC = () => {
  // const { user: { user_metadata: { fullName, avatar } = {} } = {} } = useUser();

  const avatar = "default-user.jpg";
  const fullName = "UserAvatar";

  return (
    <div className="flex items-center gap-5 text-sm font-medium text-grey-600">
      <img
        src={avatar}
        alt={fullName || "User Avatar"}
        className="block aspect-square w-9 rounded-full object-cover object-center outline-2 outline-grey-100"
      />
      <span>{fullName}</span>
    </div>
  );
};

export default UserAvatar;
