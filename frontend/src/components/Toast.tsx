import { cn } from '@/lib/utils'
import React from 'react'

const Toast  = ({open, close, message, deleted}: ToastProps) => {
  const color = 'red'
    return (
      <div id="alert-border-3" className={cn(`fixed flex -m-8 px-4 justify-between w-1/2 lg:w-1/4 py-4 -right-full transition-all duration-500 bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 rounded-lg`, {"right-10": open})} role="alert">
  <p className="text-bold">{message}</p>
  <button className={`text-${color}-700 font-bold hover:text-${color}-900`}
  onClick={()=>{close()}}>
          ✕
  </button>
  </div>
    )
  }

export default Toast