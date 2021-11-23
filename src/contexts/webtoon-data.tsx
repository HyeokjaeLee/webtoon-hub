import { createContext } from "react";

let webtoon: any;

export const WebtoonData: React.Context<Webtoon.context> = createContext(webtoon);
