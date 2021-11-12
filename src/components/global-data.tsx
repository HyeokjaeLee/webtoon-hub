import React, { createContext } from "react"

const defaultTheme: {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
} = {
  theme: "",
  setTheme: () => {},
}
export const ThemeContext = createContext(defaultTheme)
