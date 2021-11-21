import "assets/scss/App.scss";
import axios from "axios";
import Nav from "components/nav";
function App() {
  console.log("test");
  test();
  return (
    <div className="test">
      <Nav />
    </div>
  );
}

export default App;

async function test() {
  const res = await axios.get("https://korea-webtoon-api.herokuapp.com/all");
  const data: Webtoon.Data = res.data;
}
