import "assets/scss/App.scss";
import axios from "axios";
import Nav from "components/nav";
import { WebtoonData } from "contexts/webtoon-data";
import { useEffect, useState } from "react";
import tempWebtoonData from "assets/data/temp-webtoon-data.json";
import { Route, Routes, Router } from "react-router-dom";
import { Home } from "pages/webtoon-page";
function App() {
  const [data, setData] = useState<Webtoon.Data[]>(tempWebtoonData);
  useEffect(() => {
    set_webtoon_data(setData);
  }, []);
  return (
    <WebtoonData.Provider value={{ data, setData }}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home test={"ss"} />} />
      </Routes>
    </WebtoonData.Provider>
  );
}

export default App;

async function set_webtoon_data(setData: Webtoon.SetState) {
  const res = await axios.get("https://korea-webtoon-api.herokuapp.com/all");
  console.log(res.data);
  setData(res.data);
}
