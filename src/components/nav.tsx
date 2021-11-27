import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import "assets/scss/components/nav.scss";
import { ReactComponent as KakaoPage } from "assets/img/kakao-page.svg";
import { ReactComponent as KakaoWebtoon } from "assets/img/kakao-webtoon.svg";
import { ReactComponent as NaverWebtoon } from "assets/img/naver-webtoon.svg";
import { ReactComponent as SearchIcon } from "assets/img/search.svg";
import { ReactComponent as AllWebtoon } from "assets/img/all-webtoon.svg";
import Search from "components/search";
import { useState } from "react";
import { Link } from "react-router-dom";

function PlatformLink(prop: {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  platform: string;
  setState: React.Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  const { icon, platform, setState } = prop;
  const Icon = icon;
  return (
    <li>
      <Link
        to={`/${platform.toLocaleLowerCase().replace(" ", "-")}`}
        className="platform-link"
        onClick={() => setState(<Icon className="platform-icon" />)}
      >
        <Icon className="platform-icon" />
        {platform}
      </Link>
    </li>
  );
}

export default () => {
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(
    <AllWebtoon className="platform-icon" />
  );
  return (
    <>
      <Search isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />
      <div className="nav-container">
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
            <div className="selected-platform">{selectedPlatform}</div>
            <Collapse isOpen={isPlatformOpen} className="platform-collapse">
              <ul className="platform-list">
                <PlatformLink
                  icon={AllWebtoon}
                  setState={setSelectedPlatform}
                  platform="All platforms"
                />
                <PlatformLink
                  icon={NaverWebtoon}
                  setState={setSelectedPlatform}
                  platform="Naver Webtoon"
                />
                <PlatformLink
                  icon={KakaoWebtoon}
                  setState={setSelectedPlatform}
                  platform="Kakao Webtoon"
                />
                <PlatformLink
                  icon={KakaoPage}
                  setState={setSelectedPlatform}
                  platform="Kakao Page"
                />
              </ul>
            </Collapse>
          </button>
        </Navbar>
        <ul className="week-list">
          <li>
            <Link to="?week=mon">월</Link>
          </li>
          <li>
            <Link to="?week=tue">화</Link>
          </li>
          <li>
            <Link to="?week=wed">수</Link>
          </li>
          <li>
            <Link to="?week=thu">목</Link>
          </li>
          <li>
            <Link to="?week=fri">금</Link>
          </li>
          <li>
            <Link to="?week=sat">토</Link>
          </li>
          <li>
            <Link to="?week=sun">일</Link>
          </li>
          <li>
            <Link to="?week=fin">완결</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
