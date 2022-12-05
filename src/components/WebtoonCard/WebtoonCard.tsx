import scss from "./WebtoonCard.module.scss";

import { Webtoon } from "../../types";

import { ServiceBadge, AddtionalInfoBadges, FanCountBadge } from "..";

export const WebtoonCard = ({ fanCount, ...restProps }: Webtoon) => (
  <li className={scss["webtoon-card"]}>
    <a className={scss["webtoon-link"]} href={restProps.url} target="_blank">
      <ServiceBadge service={restProps.service} />
      <AddtionalInfoBadges additionalInfo={restProps.additional} />
      <div className={scss["thumbnail-wrap"]}>
        <img src={restProps.img} className={scss.thumbnail} />
        {fanCount && <FanCountBadge fanCount={fanCount} />}
      </div>
      <p className={scss.title}>{restProps.title}</p>
    </a>
  </li>
);
