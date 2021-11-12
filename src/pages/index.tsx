import { WebtoonData } from "contexts/webtoon-data"
import React from "react"
export default function Home() {
  return (
    <WebtoonData.Consumer>
      {data => {
        console.log(data?.data?.[0])
        return ""
      }}
    </WebtoonData.Consumer>
  )
}
