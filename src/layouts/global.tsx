import "styles/global.scss"
import React, { useState, useEffect } from "react"
import { WebtoonData } from "contexts/webtoon-data"
import axios from "axios"
export default function TemplateWrapper({ children }: any) {
  const [data, setData]: [Webtoon.State, Webtoon.SetState] = useState(undefined)
  useEffect(() => {
    set_webtoon_data(setData)
  }, [])

  return (
    <WebtoonData.Provider value={{ data, setData }}>
      <nav className="main_nav">
        <h1>WEBTOON HUB</h1>
      </nav>
      {children}
    </WebtoonData.Provider>
  )
}

async function set_webtoon_data(setData: Webtoon.SetState) {
  const res = await axios.get("http://korea-webtoon-api.herokuapp.com/all")
  setData(res.data)
}
