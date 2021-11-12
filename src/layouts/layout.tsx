import { useState, useEffect } from "react"
import "../assets/scss/global.scss"
import React from "react"
import { Link } from "gatsby"
import { ThemeContext } from "../components/global-data"
const TemplateWrapper = ({ children, location }: any) => {
  const [theme, setTheme] = useState("")
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      test
      {children}
    </ThemeContext.Provider>
  )
}

export default TemplateWrapper
