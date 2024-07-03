"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Toaster() {
  const { toasts } = useToast()
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
          className={cn("border-green-500", {"border-red-500": title==="Error"})}
           key={id} 
           {...props}>
            <div className="grid gap-1">
              {title&&<ToastTitle>{title}</ToastTitle>}
             
              {description&&
              <ToastDescription>{description}</ToastDescription>
              }
           
            </div>
    
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
