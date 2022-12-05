import scss from "./AddtionalInfoBadges.module.scss";
import { Webtoon, Singularity } from "../../types";
import { WaitFree } from "assets/svg";

interface AddtionalInfoBadgeProps {
  children: React.ReactNode;
  className: string;
}

const AddtionalInfoBadge = ({
  children,
  className,
}: AddtionalInfoBadgeProps) => (
  <div className={className}>
    <span>{children}</span>
  </div>
);

interface AddtionalInfoBadgesProps {
  additionalInfo: Webtoon["additional"];
}

export const AddtionalInfoBadges = ({
  additionalInfo,
}: AddtionalInfoBadgesProps) => {
  return (
    <div className={scss.additional}>
      {additionalInfo.new && (
        <AddtionalInfoBadge className={scss.new}>신규</AddtionalInfoBadge>
      )}
      {additionalInfo.rest && (
        <AddtionalInfoBadge className={scss.rest}>휴재</AddtionalInfoBadge>
      )}
      {additionalInfo.up && (
        <AddtionalInfoBadge className={scss.up}>UP</AddtionalInfoBadge>
      )}
      {additionalInfo.adult && (
        <AddtionalInfoBadge className={scss.adult}>19</AddtionalInfoBadge>
      )}
      {additionalInfo.singularityList.includes(Singularity.OVER_15) && (
        <AddtionalInfoBadge className={scss.over15}>15</AddtionalInfoBadge>
      )}
      {additionalInfo.singularityList.includes(Singularity.WAIT_FREE) && (
        <AddtionalInfoBadge className={scss["wait-free"]}>
          <WaitFree width="2em" color="#DCE2F0" />
        </AddtionalInfoBadge>
      )}
    </div>
  );
};
