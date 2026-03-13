import React from "react";

interface ButtonIconProps {
  children: React.ReactNode;
  onClick: () => void;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ children, onClick }) => (
  <button
    type="button"
    className="rounded-full border-none bg-none p-1.5 transition-all duration-200 hover:cursor-pointer hover:bg-grey-200 [&>svg]:h-5.5 [&>svg]:w-5.5 [&>svg]:text-brand-600"
    onClick={onClick}
  >
    {children}
  </button>
);

export default ButtonIcon;
