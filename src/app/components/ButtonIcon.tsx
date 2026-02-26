import React from "react";


//使用 action + transition 来实现按钮点击的视觉反馈
//好处：提升用户体验，提供即时反馈

interface ButtonIconProps {
  children: React.ReactNode;
  onClick: () => void;
}


const ButtonIcon: React.FC<ButtonIconProps> = ({ children, onClick }) => (
  <button
    type="button"
    className="bg-none border-none p-1.5 transition-all duration-200 hover:bg-grey-200 hover:cursor-pointer rounded-full [&>svg]:w-5.5 [&>svg]:h-5.5 [&>svg]:text-brand-600"
    onClick={onClick}
  >
    {children}
  </button>
);


export default ButtonIcon;