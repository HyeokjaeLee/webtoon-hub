import "assets/scss/pages/webtoon-page.scss";
import { Link, useLocation } from "react-router-dom";
import RandomRecommend from "components/random-recommend";
import axios from "axios";
import QueryString from "qs";
import { useEffect, useState } from "react";
export function WebtoonPage({ platform }: { platform: string }) {
  const { search } = useLocation();
  const query = QueryString.parse(search, { ignoreQueryPrefix: true });
  const [webtoon, setWebtoon] = useState<JSX.Element[]>();
  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://korea-webtoon-api.herokuapp.com/${platform}/week?day=${query.week}`
      );
      console.log(data);
    })();
  }, [query.week]);
  return (
    <main>
      <section className="contents-container">
        <RandomRecommend />
      </section>
      <section className="contents-container"></section>
    </main>
  );
}
