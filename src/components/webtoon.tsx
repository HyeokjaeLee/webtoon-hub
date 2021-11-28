import "assets/scss/components/webtoon.scss";
import { ReactComponent as KakaoWebtoon } from "assets/img/kakao-webtoon.svg";
import { ReactComponent as KakaoPage } from "assets/img/kakao-page.svg";
import { ReactComponent as NaverWebtoon } from "assets/img/naver-webtoon.svg";
export default function Webtoon(props: { webtoonData: Webtoon.Data }) {
  const { webtoonData } = props;
  const service = webtoonData.service;
  const ServiceLogo =
    service === "naver" ? <NaverWebtoon /> : service === "kakao" ? <KakaoWebtoon /> : <KakaoPage />;
  return (
    <li className="webtoon">
      <a href={webtoonData.url} className="webtoon-link" target="_blank">
        {ServiceLogo}
        <img src={webtoonData.img} className="thumbnail" />
        <div className="info-wrap">
          <p className="title">{webtoonData.title}</p>
        </div>
      </a>
    </li>
  );
}
