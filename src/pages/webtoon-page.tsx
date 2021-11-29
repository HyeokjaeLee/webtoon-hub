import "assets/scss/pages/webtoon-page.scss";
import { useLocation } from "react-router-dom";
import RandomRecommend from "components/random-recommend";
import Webtoon from "components/webtoon";
import Loading from "components/loading";
import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Spinner } from "reactstrap";
const API_URL = "https://korea-webtoon-api.herokuapp.com";
const todayWeekNum = new Date().getDay();
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const EMPTY = <></>;
const todayWeek = week[todayWeekNum];
let part = 2;

export function WebtoonPage() {
  let { search, pathname } = useLocation();
  const visibleWebtoonCount = part * 12;
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const [WebtoonList, setWebtoonList] = useState<JSX.Element[]>([EMPTY]);

  useEffect(() => {
    part = 2;
    (async () => {
      setWebtoonList([<Loading />]);
      const PLATFORM_URL =
        pathname === "/" ? "/all" : pathname === "/kakaoPage" ? "/kakao-page" : pathname;
      !query.week && (query.week = todayWeek);
      const WEEK_URL = query.week === "fin" ? "/finished" : "/week?day=" + query.week;
      const { data }: { data: Webtoon.Data[] } = await axios.get(API_URL + PLATFORM_URL + WEEK_URL);
      console.log(API_URL + PLATFORM_URL + WEEK_URL);
      const WebtoonList = data.map((webtoon) => <Webtoon webtoonData={webtoon} />);
      setWebtoonList(WebtoonList);
    })();
  }, [query.week, pathname]);
  const [moreRef, isMoreRefShow] = useInView();
  isMoreRefShow && part++;
  const More =
    visibleWebtoonCount < WebtoonList.length && 24 < WebtoonList.length ? (
      <li ref={moreRef} className="loading">
        <Spinner />
      </li>
    ) : (
      EMPTY
    );
  const VisibleWebtoonList = WebtoonList.slice(0, part * 12);
  VisibleWebtoonList.push(More);

  return (
    <main>
      <section className="contents-container">
        <RandomRecommend />
      </section>
      <section className="contents-container">
        <ul className="webtoon-list">{VisibleWebtoonList}</ul>
      </section>
    </main>
  );
}
