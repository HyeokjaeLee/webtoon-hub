import axios from "axios";
import type { WebtoonsData } from "../types";
const API_URL = "https://korea-webtoon-api.herokuapp.com";

export const getWebtoonsByUpdateDay = async (
  page: number,
  updateDay?: string | null
): Promise<WebtoonsData | null> => {
  try {
    const pageParam = `perPage=12&page=${page}`;
    const updateDayParam = updateDay ? `updateDay=${updateDay}` : "";
    const { data } = await axios.get(
      `${API_URL}?${pageParam}&${updateDayParam}`
    );
    return data;
  } catch {
    return null;
  }
};
