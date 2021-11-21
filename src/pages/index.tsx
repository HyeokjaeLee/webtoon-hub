import { WebtoonData } from "contexts/webtoon-data"
import React, { useContext, useEffect, useState } from "react"
import Webtoon from "components/webtoon"
export default function Home() {
  const webtoonContext = useContext(WebtoonData)

  if (!!webtoonContext?.data) {
    const [webtoonData, setWebtoonData] = useState(webtoonContext.data)
    useEffect(() => {
      let todayWeekNum = new Date().getDay()
      todayWeekNum = todayWeekNum === 0 ? 6 : todayWeekNum - 1
      setWebtoonData(
        webtoonData.filter(webtoon => webtoon.week === todayWeekNum)
      )
    }, [])
    return (
      <>
        <nav className="sub-nav">
          <ul className="week-list">
            <li>
              <a>월</a>
            </li>
            <li>
              <a>화</a>
            </li>
            <li>
              <a>수</a>
            </li>
            <li>
              <a>목</a>
            </li>
            <li>
              <a>금</a>
            </li>
            <li>
              <a>토</a>
            </li>
            <li>
              <a>일</a>
            </li>
            <li className="finished">
              <a>완결</a>
            </li>
          </ul>
        </nav>
        <ul className="webtoon-list">
          {webtoonData.map(webtoon => (
            <Webtoon webtoonData={webtoon} />
          ))}
        </ul>
      </>
    )
  } else {
    return <div>서버가 꺼저있습니다.</div>
  }
}
