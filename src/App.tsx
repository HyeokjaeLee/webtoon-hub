import "assets/scss/App.scss";
import Nav from "components/nav";
import { Route, Routes } from "react-router-dom";
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
