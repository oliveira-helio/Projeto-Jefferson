"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      className={`
      cursor-pointer
      disabled: Opacity-70
      hover:bg-opacity-80
      ${disabled ? "cursor-not-allowed bg-opacity-80" : "cursor-pointer"}
      rounded-full
      transition
      w-auto
      border-pink-400
      flex
      flex-grow-[0.12]
      items-center
      justify-center
      gap-2
      ${outline ? "bg-pink-300" : "bg-pinkSecondary"}
      ${outline ? "text-slate-800" : "text-black"}
      ${small ? "text-sm font-normal" : "text-base font-medium"}
      ${small ? "py-1 px-2" : "py-2 px-3"}
      ${custom ? custom : ""}
      `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
