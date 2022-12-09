import { Route, Routes } from "react-router-dom";
import { WebtoonsPage } from "./pages";
import { DefaultLayout } from "./layouts";

function App() {
  return (
    <Routes>
      {["/", "/naver", "/kakao", "/kakaoPage"].map((path) => (
        <Route
          path={path}
          element={
            <DefaultLayout>
              <WebtoonsPage />
            </DefaultLayout>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
