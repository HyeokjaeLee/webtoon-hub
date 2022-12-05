import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import "assets/scss/components/nav.scss";
import { ReactComponent as KakaoPage } from "assets/img/kakao-page.svg";
import { ReactComponent as KakaoWebtoon } from "assets/img/kakao-webtoon.svg";
import { ReactComponent as NaverWebtoon } from "assets/img/naver-webtoon.svg";
import { ReactComponent as SearchIcon } from "assets/img/search.svg";
import { ReactComponent as AllWebtoon } from "assets/img/all-webtoon.svg";

import Search from "components/search";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface LinkOption {
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  name: string;
  src: string;
}
const todayWeekNum = new Date().getDay();
const week = ["일", "월", "화", "수", "목", "금", "토"];
const weekdayLinkOptions = week.map((weekday, weeknum) => ({
  name: weekday,
  src: `?week=${weeknum}`,
}));
weekdayLinkOptions.push({ name: "완결", src: "?week=fin" });
const platformLinkOptions = {
  all: {
    icon: AllWebtoon,
    name: "전체",
    src: "/all",
  },
  naver: {
    icon: NaverWebtoon,
    name: "네이버 웹툰",
    src: "/naver",
  },
  kakao: {
    icon: KakaoWebtoon,
    name: "카카오 웹툰",
    src: "/kakao",
  },
  kakaoPage: {
    icon: KakaoPage,
    name: "카카오 페이지",
    src: "/kakaoPage",
  },
};
const todayWeek = week[todayWeekNum];

export default () => {
  const updateDayMapper = [
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
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const updateDay = searchParams.get("updateDay");

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

  const platform = pathname.split("/")[1] as keyof typeof platformLinkOptions;
  const SelectedIcon = !platform
    ? platformLinkOptions.all.icon
    : platformLinkOptions[platform].icon;

  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const PlatformLink = (props: { option: LinkOption }) => {
    const { option } = props;
    const { icon, name, src } = option;
    const Icon = icon;
    return (
      <li>
        <Link to={src} className="platform-link">
          <Icon className="platform-icon" />
          <p>{name}</p>
        </Link>
      </li>
    );
  };

  return (
    <>
      <div className="nav-container">
        <Search isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
        <Navbar className="navbar" light>
          <NavbarBrand className="me-auto" href="./">
            WEBTOON HUB
          </NavbarBrand>
          <button
            className="nav-button"
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
            }}
          >
            <SearchIcon className="search-icon" />
          </button>
          <button
            className="nav-button"
            onClick={() => {
              setIsPlatformOpen(!isPlatformOpen);
            }}
          >
            <div className="selected-platform">
              <SelectedIcon className="platform-icon" />
            </div>
            <Collapse isOpen={isPlatformOpen} className="platform-collapse">
              <ul className="platform-list">
                <PlatformLink option={platformLinkOptions.all} />
                <PlatformLink option={platformLinkOptions.naver} />
                <PlatformLink option={platformLinkOptions.kakao} />
                <PlatformLink option={platformLinkOptions.kakaoPage} />
              </ul>
            </Collapse>
          </button>
        </Navbar>
        <ul className="week-list">
          {updateDayMapper.map(({ name, value }) => {
            const isActive = updateDay === value;
            return (
              <li>
                <Link
                  to={`?updateDay=${value}`}
                  className={isActive ? "active" : ""}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
