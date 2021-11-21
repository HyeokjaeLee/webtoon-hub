import "assets/scss/index.scss";
import axios from "axios";
import { Button } from "reactstrap";
function App() {
  console.log("test");
  test();
  return (
    <div className="test">
      <div className="App">
        <Button color="info">info</Button>
        <Button color="danger">danger</Button>
        <Button color="success">success</Button>
      </div>
    </div>
  );
}

export default App;

async function test() {
  const res = await axios.get("https://korea-webtoon-api.herokuapp.com/all");
  const data: Webtoon.Data = res.data;
}
