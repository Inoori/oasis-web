export type UserAvatarMenuItemProps = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

export default function UserAvatarMenuItem({
  label,
  icon,
  onClick,
}: UserAvatarMenuItemProps) {
  return (
    <li
      className="group/menu flex cursor-pointer items-center gap-2 px-4 py-2 text-base font-normal hover:bg-accent"
      onClick={onClick ? () => onClick() : undefined}
    >
      {icon && (
        <div className="flex size-8 items-center justify-center rounded-full bg-accent group-hover/menu:bg-primary-foreground/30">
          {icon}
        </div>
      )}
      <span className="ml-2">{label}</span>
    </li>
  );
}
