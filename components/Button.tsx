"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`transition transform active:scale-95 ${className} px-4 py-2 bg-blue-500 text-white rounded-md`}
    >
      {children}
    </button>
  );
};

export default Button;
