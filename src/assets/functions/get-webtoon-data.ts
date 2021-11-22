import axios from "axios";

export async function test() {
  const res = await axios.get("https://korea-webtoon-api.herokuapp.com/all");
  const data: Webtoon.Data = res.data;
}
