//LoaderProvider.ts

import { ReactNode, createContext, useState } from "react"

export type LoaderContextProps = {
    isLoading: boolean
    start: () => void
    stop: () => void
    loaderText: string
  }
  
  export const LoaderContext = createContext<LoaderContextProps>({} as LoaderContextProps)

  export const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [loaderText, setLoaderText] = useState('')
  
    const start = (loaderText = 'Loader...') => {
      setLoaderText(loaderText)
      setIsLoading(true)
    }
  
    const stop = () => setIsLoading(false)
  
    return (
      <LoaderContext.Provider
        value={{
          isLoading,
          start,
          stop,
          loaderText
        }}
      >
        {children}
      </LoaderContext.Provider>
    )
  }