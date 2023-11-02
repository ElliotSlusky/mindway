import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  className,
  onClick,
  ...props
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={twMerge(
        "flex w-full justify-center rounded-full bg-indigo-500 px-4 py-3 font-normal leading-6 text-indigo-100 hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        className
      )}
    >
      {children}
    </button>
  );
}
