import scss from "./ServiceButton.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useCallback, useState } from "react";
import { Kakao, KakaoPage, All, Naver } from "assets/svg";

const SERVICE_LIST = [
  {
    icon: All,
    name: "전체",
    to: "/",
  },
  {
    icon: Naver,
    name: "네이버",
    to: "/naver",
  },
  {
    icon: Kakao,
    name: "카카오",
    to: "/kakao",
  },
  {
    icon: KakaoPage,
    name: "카카오 페이지",
    to: "/kakaoPage",
  },
];

export const ServiceButton = () => {
  const [modalOpened, setModalOpened] = useState<boolean | "closing">(false);

  const closeModal = useCallback(() => {
    setModalOpened("closing");
    setTimeout(() => {
      setModalOpened(false);
    }, 300);
  }, [setModalOpened]);

  const { pathname } = useLocation();

  const SelectedIcon = SERVICE_LIST.find(({ to }) => pathname === to)?.icon;

  return (
    <div className={scss["service-button-container"]}>
      {modalOpened && (
        <div
          className={scss["out-layer"]}
          onClick={() => {
            closeModal();
          }}
        />
      )}
      <button
        className={scss["service-logo-wrap"]}
        onClick={() => {
          modalOpened ? closeModal() : setModalOpened(true);
        }}
      >
        {SelectedIcon && <SelectedIcon />}
      </button>
      <div
        className={`${scss["service-modal"]} ${
          modalOpened === "closing"
            ? scss.closing
            : modalOpened
            ? scss.opening
            : scss.closed
        }`}
      >
        {SERVICE_LIST.map(({ icon: Icon, to, name }) => {
          return (
            <NavLink
              to={to}
              onClick={() => setModalOpened(false)}
              className={({ isActive }) =>
                isActive
                  ? scss.active
                  : `${scss["service-logo-wrap"]} ${scss["service-link"]}`
              }
            >
              <Icon />
              <span>{name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
