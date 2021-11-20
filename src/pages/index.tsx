import { WebtoonData } from "contexts/webtoon-data"
import React, { useContext } from "react"
import Webtoon from "components/webtoon"
export default function Home() {
  const webtoonContext = useContext(WebtoonData)
  const webtoonData = webtoonContext?.data?.slice(0, 100)
  if (!!webtoonData) {
    return (
      <ul className="webtoon-list">
        {webtoonData.map(webtoon => (
          <Webtoon webtoonData={webtoon} />
        ))}
      </ul>
    )
  } else {
    return <div></div>
  }
}
