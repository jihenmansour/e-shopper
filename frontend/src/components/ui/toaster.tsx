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

export function Toaster() {
  const { toasts } = useToast()

  return (
  
          <Toast >
            <div className="grid gap-1">
              <ToastTitle>message</ToastTitle>
 
                <ToastDescription>description</ToastDescription>
              
            </div>
        
            <ToastClose />
          </Toast>
        )

  
}
