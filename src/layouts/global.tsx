import "styles/global.scss"
import React, { useState, useEffect } from "react"
import { WebtoonData } from "contexts/webtoon-data"
import KakaoWebtoon from "img/kakao-webtoon.svg"
import KakaoPage from "img/kakao-page.svg"
import NaverWebtoon from "img/naver-webtoon.svg"
import axios from "axios"
export default function TemplateWrapper({ children }: any) {
  const [data, setData]: [Webtoon.State, Webtoon.SetState] = useState(undefined)
  useEffect(() => {
    set_webtoon_data(setData)
  }, [])
  console.log("test2")
  return (
    <WebtoonData.Provider value={{ data, setData }}>
      <nav className="main-nav">
        <h1>WEBTOON HUB</h1>
        <div className="button-wrap">
          <button>Search</button>
          <button>Platform</button>
        </div>
      </nav>
      <main>{children}</main>
      <footer>
        © HyeokjaeLee. All rights reserved. Powered by GitHub Pages.
      </footer>
    </WebtoonData.Provider>
  )
}

async function set_webtoon_data(setData: Webtoon.SetState) {
  const res = await axios.get("http://korea-webtoon-api.herokuapp.com/all")
  console.log("test")
  console.log(res.data)
  setData(res.data)
}

/*
  <ul className="platform-list">
          <li>
            <NaverWebtoon />
            Naver Webtoon
          </li>
          <li>
            <KakaoWebtoon />
            Kakao Webtoon
          </li>
          <li>
            <KakaoPage />
            Kakao Page
          </li>
          <li>
            <span className="all-img">A</span>
            All Platform
          </li>
        </ul> */
