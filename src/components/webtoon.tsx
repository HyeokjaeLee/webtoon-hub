import React from "react"
import KakaoWebtoon from "img/kakao-webtoon.svg"
import KakaoPage from "img/kakao-page.svg"
import NaverWebtoon from "img/naver-webtoon.svg"
export default function Webtoon(props: { webtoonData: Webtoon.Data }) {
  const { webtoonData } = props
  const service = webtoonData.service
  const ServiceLogo =
    service === "naver" ? (
      <NaverWebtoon />
    ) : service === "kakao" ? (
      <KakaoWebtoon />
    ) : (
      <KakaoPage />
    )
  return (
    <li className="webtoon">
      <a href={webtoonData.url} className="webtoon-link">
        {ServiceLogo}
        <img src={webtoonData.img} className="thumbnail" />
        <div className="info-wrap">
          <p className="title">{webtoonData.title}</p>
        </div>
      </a>
    </li>
  )
}
