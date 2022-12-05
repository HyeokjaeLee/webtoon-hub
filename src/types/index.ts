export enum Service {
  NAVER = "naver",
  KAKAO = "kakao",
  KAKAO_PAGE = "kakaoPage",
}

export enum UpdateDay {
  SUN = "sun",
  MON = "mon",
  TUE = "tue",
  WED = "wed",
  THU = "thu",
  FRI = "fri",
  SAT = "sat",
  FINISHED = "finished",
  NAVER_DAILY = "naverDaily",
}

export enum Singularity {
  OVER_15 = "over15",
  FREE = "free",
  WAIT_FREE = "waitFree",
}

export interface Webtoon {
  webtoonId: number;
  title: string;
  author: string;
  url: string;
  img: string;
  service: Service;
  updateDays: UpdateDay[];
  fanCount: number | null;
  searchKeyword: string;
  additional: {
    new: boolean;
    rest: boolean;
    up: boolean;
    adult: boolean;
    singularityList: Singularity[];
  };
}

export interface WebtoonsData {
  totalWebtoonCount: number;
  naverWebtoonCount: number;
  kakaoWebtoonCount: number;
  kakaoPageWebtoonCount: number;
  updatedWebtoonCount: number;
  createdWebtoonCount: number;
  lastUpdate?: string;
  isLastPage?: boolean;
  webtoons: Webtoon[];
}
