// "use client";

import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="w-52 text-center bg-black/30 p-6 rounded-lg border-primary-light border hover:border-primary-accent hover:scale-105 transition-all"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
