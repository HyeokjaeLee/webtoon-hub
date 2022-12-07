import { useEffect, useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import scss from "./UpdateDaysBar.module.scss";

const UPDATE_DAY_LIST = [
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

export const UpdateDaysBar = () => {
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const updateDay = searchParams.get("updateDay");

  const navigate = useNavigate();

  const updateDayList = useMemo(() => {
    const updateDayList =
      pathname === "/naver"
        ? [...UPDATE_DAY_LIST, { name: "매일+", value: "naverDaily" }]
        : UPDATE_DAY_LIST;

    const isInvalidUpdateDay = !updateDayList.find(
      ({ value }) => value === updateDay
    );

    if (isInvalidUpdateDay) {
      const todayWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
        new Date().getDay()
      ];

      navigate(`?updateDay=${todayWeek}`);
    }

    return updateDayList;
  }, [pathname]);

  return (
    <ul className={scss["update-day-bar"]}>
      {updateDayList.map(({ name, value }) => (
        <li className={scss["update-day-bar-item"]}>
          <NavLink
            to={`?updateDay=${value}`}
            className={() => (value === updateDay ? scss.active : "")}
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
