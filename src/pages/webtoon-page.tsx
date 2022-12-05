import "assets/scss/pages/webtoon-page.scss";
import { useLocation } from "react-router-dom";
import { getWebtoonsByUpdateDay } from "../utils";
import { WebtoonsList } from "../components";

const API_URL = "https://korea-webtoon-api.herokuapp.com";
const todayWeekNum = new Date().getDay();
const week = ["6", "0", "1", "2", "3", "4", "5"];
const EMPTY = <></>;
const todayWeek = week[todayWeekNum];
let part = 2;

export function WebtoonPage() {
  return (
    <main>
      <WebtoonsList />
    </main>
  );
}
