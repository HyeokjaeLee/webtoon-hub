import { WebtoonData } from "contexts/webtoon-data"
import React, { useContext } from "react"
import Webtoon from "components/webtoon"
export default function Home() {
  const webtoonContext = useContext(WebtoonData)
  const webtoonData = webtoonContext?.data
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
//https://kr-a.kakaopagecdn.com/P/C/2598/sharing/2x/eacb00ec-9034-42cb-a533-7c7690741113.jpg
//https://kr-a.kakaopagecdn.com/P/C/2598/sharing/2x/4e967286-1166-4f31-b523-f66035f64984.jpg
//https://kr-a.kakaopagecdn.com/P/C/2590/sharing/2x/85f4adce-871f-473d-8ef3-2b80ffd87f64.jpg
//b08b1a9e-09d2-4732-97da-ee1bf96d4f80
