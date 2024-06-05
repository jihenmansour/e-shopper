import { cn } from "@/lib/utils";
import React from "react";

const Toast = ({ open, close, message, success }: ToastProps) => {
  return (
    <div
      id="alert-border-3"
      className={cn(
        "fixed flex -m-8 px-4 justify-between w-1/2 lg:w-1/4 py-4 -right-full transition-all duration-500 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg",
        { "right-10": open },
        { "bg-green-100 border-green-500 text-green-700": success }
      )}
      role="alert"
    >
      <p className="text-bold">{message}</p>
      <button
        className={cn("text-red-700 font-bold hover:text-red-900", {
          "text-green-700 hover:text-red-900": success,
        })}
        onClick={() => {
          close();
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
