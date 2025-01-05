// "use client";

import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="w-36 text-center bg-black/10 p-4 rounded-lg border-primary-light border hover:border-primary-accent hover:scale-105 transition-all  ml-1 mr-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
