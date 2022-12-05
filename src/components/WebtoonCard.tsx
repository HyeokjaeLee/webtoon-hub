import "assets/scss/components/webtoon.scss";
import { ReactComponent as KakaoWebtoon } from "assets/img/kakao-webtoon.svg";
import { ReactComponent as KakaoPage } from "assets/img/kakao-page.svg";
import { ReactComponent as NaverWebtoon } from "assets/img/naver-webtoon.svg";
import { Webtoon, Singularity } from "../types";
import { ReactComponent as Clock } from "assets/img/clock.svg";

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

const Badge = (txt: React.ReactNode, className: string) => (
  <div className={className}>
    <span>{txt}</span>
  </div>
);
const BadgeList = (props: { additional: Webtoon["additional"] }) => {
  let badges: React.ReactNode[] = [];
  const { additional } = props;
  additional.new && badges.push(Badge("신규", "new"));
  additional.rest && badges.push(Badge("휴재", "rest"));
  additional.up && badges.push(Badge("UP", "up"));
  additional.adult && badges.push(Badge("19", "adult"));
  additional.singularityList.includes(Singularity.OVER_15) &&
    badges.push(Badge("15", "over15"));
  additional.singularityList.includes(Singularity.WAIT_FREE) &&
    badges.push(Badge(<Clock width="2em" color="#DCE2F0" />, "wait-free"));
  return <div className="additional">{badges}</div>;
};
export const WebtoonCard = ({ fanCount, ...restProps }: Webtoon) => {
  const fanCountText = fanCount
    ? 10000 < fanCount
      ? `${(fanCount / 10000).toLocaleString("en-US")}억`
      : fanCount.toLocaleString("en-US") + "만"
    : "";
  return (
    <li className="webtoon-link-wrap">
      <a className="webtoon-link" href={restProps.url} target="_blank">
        <PlatformLogo platform={restProps.service} />
        <BadgeList additional={restProps.additional} />
        <div className="thumbnail-wrap">
          <img src={restProps.img} className="thumbnail" />
          {fanCount && <p className="fan-count">♥︎ {fanCountText}+</p>}
        </div>
        <p className="title">{restProps.title}</p>
      </a>
    </li>
  );
};
