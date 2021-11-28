import "assets/scss/components/webtoon.scss";
import { ReactComponent as KakaoWebtoon } from "assets/img/kakao-webtoon.svg";
import { ReactComponent as KakaoPage } from "assets/img/kakao-page.svg";
import { ReactComponent as NaverWebtoon } from "assets/img/naver-webtoon.svg";

function PlatformLogo(props: { platform: string }) {
  const { platform } = props;
  return platform === "naver" ? (
    <NaverWebtoon />
  ) : platform === "kakao" ? (
    <KakaoWebtoon />
  ) : (
    <KakaoPage />
  );
}

export default function Webtoon(props: { webtoonData: Webtoon.Data }) {
  const { webtoonData } = props;
  return (
    <li className="webtoon-link-wrap">
      <a className="webtoon-link" href={webtoonData.url} target="_blank">
        <PlatformLogo platform={webtoonData.service} />
        <div className="thumbnail-wrap">
          <img src={webtoonData.img} className="thumbnail" />
        </div>
        <p className="title">{webtoonData.title}</p>
      </a>
    </li>
  );
}
/*
    <li className="webtoon">
      <a href={webtoonData.url} className="webtoon-link" target="_blank">
        {ServiceLogo}
        <div className="thumbnail-wrap">
          <img src={webtoonData.img} className="thumbnail" />
        </div>
        <div className="info-wrap">
          <p className="title">{webtoonData.title}</p>
        </div>
      </a>
    </li> */
