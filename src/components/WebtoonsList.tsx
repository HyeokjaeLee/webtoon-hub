import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { WebtoonCard } from "../components";
import { getWebtoonsByUpdateDay } from "../utils";
import type { Webtoon } from "../types";
import { Spinner } from "reactstrap";
import { useInView } from "react-intersection-observer";

export const WebtoonsList = () => {
  const [webtoons, setWebtoons] = useState<Webtoon[]>([]);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const updateDay = params.get("updateDay");
  const [page, setPage] = useState(0);
  const [moreRef, isMoreRefShow] = useInView();
  const [isLoading, setIsLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    isMoreRefShow && setIsLoading(true);
  }, [isMoreRefShow]);

  useEffect(() => {
    isLoading && setPage(page + 1);
  }, [isLoading]);

  useEffect(() => {
    setPage(-1);
    setWebtoons([]);
    setIsLastPage(false);
  }, [updateDay]);

  useEffect(() => {
    (async () => {
      if (isLastPage) return;
      const webtoonData = await getWebtoonsByUpdateDay(page, updateDay);
      if (!webtoonData) return;
      if (webtoonData.webtoons.length === 0) {
        setIsLastPage(true);
      } else {
        setWebtoons([...webtoons, ...webtoonData.webtoons]);
      }
      setIsLoading(false);
    })();
  }, [page]);

  return (
    <section className="contents-container">
      <ul className="webtoon-list">
        {webtoons.map((webtoon, index) => (
          <WebtoonCard {...webtoon} key={index} />
        ))}
      </ul>
      {!isLastPage && (
        <div className="loading" ref={moreRef}>
          <Spinner />
        </div>
      )}
    </section>
  );
};
