import scss from "./ServiceBadge.module.scss";
import { Kakao, KakaoPage, Naver } from "assets/svg";

const serviceLogoMapper = {
  naver: Naver,
  kakao: Kakao,
  kakaoPage: KakaoPage,
};

interface ServiceBadgeProps {
  service: keyof typeof serviceLogoMapper;
}

export const ServiceBadge = ({ service }: ServiceBadgeProps) => {
  const ServiceLogo = serviceLogoMapper[service];
  return (
    <div className={scss["service-badge-wrap"]}>
      <ServiceLogo />
    </div>
  );
};
