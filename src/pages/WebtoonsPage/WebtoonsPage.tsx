import { useLocation } from "react-router-dom";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { WebtoonCard, Loading } from "../../components";
import { getWebtoonsByUpdateDay } from "../../utils";
import type { Webtoon } from "../../types";

import { useInView } from "react-intersection-observer";
import scss from "./WebtoonsPage.module.scss";
import { debounce } from "lodash";

export const WebtoonsPage = () => {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);

  const [isLastPage, setIsLastPage] = useState(false);

  const updateDay = new URLSearchParams(useLocation().search).get("updateDay");

  const page = useRef(0);

  const [moreRef, isMoreRefShow] = useInView();

  const fetchWebtoons = useCallback(
    debounce(
      async (webtoons: Webtoon[], page: number, updateDay: string | null) => {
        const webtoonsForFetch = (await getWebtoonsByUpdateDay(page, updateDay))
          ?.webtoons;

        if (webtoonsForFetch?.length) {
          setWebtoons([...webtoons, ...webtoonsForFetch]);
        } else {
          setIsLastPage(true);
        }
      },
      1000
    ),
    [setWebtoons, setIsLastPage]
  );

  useLayoutEffect(() => {
    fetchWebtoons.cancel();
    page.current = 0;
    const emptyWebtoons: Webtoon[] = [];

    setIsLastPage(false);
    setWebtoons(emptyWebtoons);

    fetchWebtoons(emptyWebtoons, page.current, updateDay);
  }, [updateDay, fetchWebtoons, setIsLastPage]);

  useLayoutEffect(() => {
    if (isLastPage || !isMoreRefShow) return;

    fetchWebtoons(webtoons, page.current, updateDay);
    page.current++;
  }, [isMoreRefShow, fetchWebtoons]);

  return (
    <section className={scss["contents-container"]}>
      <ul className={scss["webtoon-list"]}>
        {webtoons.map((webtoon, index) => (
          <WebtoonCard {...webtoon} key={index} />
        ))}
      </ul>
      {!isLastPage && (
        <div ref={moreRef}>
          <Loading />
        </div>
      )}
    </section>
  );
};
