import "assets/scss/pages/webtoon-page.scss";
import { Link, useLocation } from "react-router-dom";
import RandomRecommend from "components/random-recommend";
import Webtoon from "components/webtoon";
import axios from "axios";
import qs from "qs";
import { useEffect, useState } from "react";
const API_URL = "https://korea-webtoon-api.herokuapp.com";
const todayWeekNum = new Date().getDay();
const week = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const todayWeek = week[todayWeekNum];
export function WebtoonPage() {
  let { search, pathname } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const [WebtoonState, setWebtoonState] = useState<JSX.Element[]>();
  useEffect(() => {
    (async () => {
      console.log(pathname);
      pathname === "/" && (pathname = "/all");
      pathname === "/kakaoPage" && (pathname = "/kakao-page");
      !query.week && (query.week = todayWeek);
      const PLATFORM_URL = API_URL + pathname;
      const WEEK_URL = query.week === "fin" ? "/finished" : "/week?day=" + query.week;
      const { data }: { data: Webtoon.Data[] } = await axios.get(PLATFORM_URL + WEEK_URL);
      const WebtoonElementArr = data.map((webtoon) => <Webtoon webtoonData={webtoon} />);
      setWebtoonState(WebtoonElementArr);
    })();
  }, [query.week, pathname]);
  return (
    <main>
      <section className="contents-container">
        <RandomRecommend />
      </section>
      <section className="contents-container">
        <ul className="webtoon-list">{WebtoonState}</ul>
      </section>
    </main>
  );
}
