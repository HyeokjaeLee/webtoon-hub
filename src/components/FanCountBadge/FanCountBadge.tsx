import scss from "./FanCountBadge.module.scss";
interface FanCountBadgeProps {
  fanCount: number;
}
export const FanCountBadge = ({ fanCount }: FanCountBadgeProps) => {
  const fanCountText =
    10000 <= fanCount
      ? `${(fanCount / 10000).toLocaleString("en-US")}억`
      : fanCount.toLocaleString("en-US") + "만";

  return <p className={scss["fan-count-badge"]}>♥︎ {fanCountText}+</p>;
};
