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

const Badge = (txt: string, className: string) => (
  <div className={className}>
    <span>{txt}</span>
  </div>
);
const BadgeList = (props: {
  additional: { new: boolean; rest: boolean; up: boolean; adult: boolean };
}) => {
  let badges: React.ReactNode[] = [];
  const { additional } = props;
  additional.new && badges.push(Badge("신규", "new"));
  additional.rest && badges.push(Badge("휴재", "rest"));
  additional.up && badges.push(Badge("UP", "up"));
  additional.adult && badges.push(Badge("19", "adult"));
  return <div className="additional">{badges}</div>;
};
export default function Webtoon(props: { webtoonData: Webtoon.Data }) {
  const { webtoonData } = props;
  return (
    <li className="webtoon-link-wrap">
      <a className="webtoon-link" href={webtoonData.url} target="_blank">
        <PlatformLogo platform={webtoonData.service} />
        <BadgeList additional={webtoonData.additional} />
        <div className="thumbnail-wrap">
          <img src={webtoonData.img} className="thumbnail" />
        </div>
        <p className="title">{webtoonData.title}</p>
      </a>
    </li>
  );
}
