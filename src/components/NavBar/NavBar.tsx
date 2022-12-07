import scss from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import "assets/scss/components/nav.scss";
import { ServiceButton, SearchButton, UpdateDaysBar } from "..";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const week = ["일", "월", "화", "수", "목", "금", "토"];
const weekdayLinkOptions = week.map((weekday, weeknum) => ({
  name: weekday,
  src: `?week=${weeknum}`,
}));
weekdayLinkOptions.push({ name: "완결", src: "?week=fin" });

const commonUpdateDayMapper = [
  {
    name: "월",
    value: "mon",
  },
  {
    name: "화",
    value: "tue",
  },
  {
    name: "수",
    value: "wed",
  },
  {
    name: "목",
    value: "thu",
  },
  {
    name: "금",
    value: "fri",
  },
  {
    name: "토",
    value: "sat",
  },
  {
    name: "일",
    value: "sun",
  },
  {
    name: "완결",
    value: "finished",
  },
];

export const NavBar = () => {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const updateDay = searchParams.get("updateDay");

  const updateDayMapper =
    pathname === "/naver"
      ? [...commonUpdateDayMapper, { name: "매일+", value: "naverDaily" }]
      : commonUpdateDayMapper;

  const isInvalidUpdateDay = !updateDayMapper.find(
    ({ value }) => value === updateDay
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (isInvalidUpdateDay) {
      navigate(
        `?updateDay=${
          ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date().getDay()]
        }`
      );
    }
  }, [isInvalidUpdateDay, navigate]);

  return (
    <nav className={scss["nav-bar"]}>
      <SearchButton />
      <Link to="/" className={scss["page-title"]}>
        <h1>WEBTOON HUB</h1>
      </Link>
      <ServiceButton />
    </nav>
  );
};
