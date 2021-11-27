import "assets/scss/pages/webtoon-page.scss";
import { Link, useLocation } from "react-router-dom";
import RandomRecommend from "components/random-recommend";
import QueryString from "qs";
export function WebtoonPage({ platform }: { platform: string }) {
  const { search } = useLocation();
  const query = QueryString.parse(search, { ignoreQueryPrefix: true });

  return (
    <main>
      <section className="contents-container">
        <RandomRecommend />
      </section>
    </main>
  );
}
