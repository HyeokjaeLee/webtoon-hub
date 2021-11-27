import "assets/scss/App.scss";
import axios from "axios";
import Nav from "components/nav";
import { WebtoonData } from "contexts/webtoon-data";
import { useEffect, useState } from "react";
import tempWebtoonData from "assets/data/temp-webtoon-data.json";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { WebtoonPage } from "pages/webtoon-page";
function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<WebtoonPage />} />
        <Route path="/all" element={<WebtoonPage />} />
        <Route path="/naver" element={<WebtoonPage />} />
        <Route path="/kakao" element={<WebtoonPage />} />
        <Route path="/kakaoPage" element={<WebtoonPage />} />
      </Routes>
    </>
  );
}

export default App;

async function set_webtoon_data(setData: Webtoon.SetState) {
  const res = await axios.get("https://korea-webtoon-api.herokuapp.com/all");
  setData(res.data);
}
