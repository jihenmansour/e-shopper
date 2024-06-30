import { cn } from "@/lib/utils";
import React from "react";

const Toast = ({ open, close, message, success }: ToastProps) => {
  return (
    <div
      id="alert-border-3"
      className={cn(
        "fixed flex -m-8 px-4 text-gray-500 bottom-16 shadow-xl justify-between w-1/2 lg:w-1/4 py-4 -right-full transition-all duration-500 bg-white border-l-8 rounded-lg",
        { "right-10": open },
        { " border-green-500": success },
        { "  border-red-500 ": !success }
      )}
      role="alert"
    >
      <p className="text-bold">{message}</p>
      <button
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
