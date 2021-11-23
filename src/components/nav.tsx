import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import "assets/scss/components/nav.scss";
import { ReactComponent as KakaoPage } from "assets/img/kakao-page.svg";
import { ReactComponent as KakaoWebtoon } from "assets/img/kakao-webtoon.svg";
import { ReactComponent as NaverWebtoon } from "assets/img/naver-webtoon.svg";
import { ReactComponent as SearchIcon } from "assets/img/search.svg";
import { ReactComponent as AllWebtoon } from "assets/img/all-webtoon.svg";
import { useState } from "react";

function PlatformButton(prop: {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  platform: string;
  setState: React.Dispatch<React.SetStateAction<JSX.Element>>;
}) {
  const { icon, platform, setState } = prop;
  const Icon = icon;
  return (
    <button
      className="platform-button"
      onClick={() => setState(<Icon className="platform-icon" />)}
    >
      <Icon className="platform-icon" />
      {platform}
    </button>
  );
}

export default () => {
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(
    <AllWebtoon className="platform-icon" />
  );
  return (
    <div>
      <Navbar className="navbar" dark>
        <NavbarBrand className="me-auto" href="/">
          WEBTOONHUB
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
              <li>
                <PlatformButton
                  icon={AllWebtoon}
                  setState={setSelectedPlatform}
                  platform="All platforms"
                />
              </li>
              <li>
                <PlatformButton
                  icon={NaverWebtoon}
                  setState={setSelectedPlatform}
                  platform="NaverWebtoon"
                />
              </li>
              <li>
                <PlatformButton
                  icon={KakaoWebtoon}
                  setState={setSelectedPlatform}
                  platform="KakaoWebtoon"
                />
              </li>
              <li>
                <PlatformButton
                  icon={KakaoPage}
                  setState={setSelectedPlatform}
                  platform="KakaoPage"
                />
              </li>
            </ul>
          </Collapse>
        </button>
        <Collapse navbar isOpen={isSearchOpen}>
          <Nav navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
