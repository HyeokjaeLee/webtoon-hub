import React, { useState, useEffect } from "react";
import "./App.css";
import Fade_bottom from "./components/animation";
const webtoon_api_url = "https://toy-projects-api.herokuapp.com/webtoon/all";
var today_weeknum = new Date().getDay();

/*const useTitle = (initialTitle: any) => {
  const [title, setTitle] = useState(initialTitle);
  const updateTitle = () => {
    const htmlTitle: any = document.querySelector("title");
    htmlTitle.innerText = title;
  };
  useEffect(updateTitle, [title]);
  return setTitle;
};
 const titleUpdater = useTitle("Loading...");
setTimeout(() => titleUpdater("Home"), 1000);*/

const get_json_data = (url: string) => {
  let xmlhttp = new XMLHttpRequest();
  let json_data: A_webtoon_info[] = [];
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      try {
        json_data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
    }
  };
  xmlhttp.open("GET", url, false); //true는 비동기식, false는 동기식 true로 할시 변수 변경전에 웹페이지가 떠버림
  xmlhttp.send();
  return json_data;
};
let webtoon_data: A_webtoon_info[] = get_json_data(webtoon_api_url);
let filtering_data: A_webtoon_info[] = webtoon_data.filter(function (element: A_webtoon_info) {
  return element.weekday == today_weeknum;
});

interface A_webtoon_info {
  title: string;
  artist: string;
  url: string;
  img: string;
  service: string;
  state: string;
  weekday: number;
}
function App() {
  const htmlTitle: any = document.querySelector("title");
  htmlTitle.innerText = "WEBTOON HUB";
  let [target_data, change_target_data] = useState(filtering_data);
  const a_webtoon: JSX.Element[] = target_data.map((target_data) => (
    <Fade_bottom key={target_data.title}>
      <a href={target_data.url}>
        <li className="webtoon_container">
          <div className="webtoon_info">
            <ul className="webtoon_info_container">
              <li
                style={{
                  fontSize: "10px",
                  listStyle: "none",
                  textAlign: "right",
                  color: "white",
                }}
              >
                <span>{target_data.service}</span>
                <span style={{ marginLeft: "2px" }}>{target_data.state}</span>
              </li>
              <li style={{ fontSize: "10px", listStyle: "none" }}>{target_data.title}</li>
              <li style={{ fontSize: "8px", listStyle: "none" }}>{target_data.artist}</li>
            </ul>
          </div>
          <div className="thumnail">
            <img src={target_data.img} className="thumnail_img" />
          </div>
        </li>
      </a>
    </Fade_bottom>
  ));

  //검색 기능
  const [search_txt, change_search_txt] = useState("");
  const set_search_txt = (e: any) => {
    change_search_txt(e.target.value);
    if (e.target.value == "") {
      change_target_data(filtering_data);
    } else {
      change_target_data(search_data(e.target.value));
    }
  };
  let [view_webtoon_count, add_view_webtoon_count] = useState(9);
  const Webtoon_area = () => {
    return <ul className="content_area">{a_webtoon.splice(0, view_webtoon_count)}</ul>;
  };

  const View_more_webtoon = () => {
    return (
      <a
        onClick={() => {
          add_view_webtoon_count(18);
        }}
      >
        more
      </a>
    );
  };
  function Filter_option(props: any) {
    return (
      <li
        onClick={() => {
          change_target_data(filter_data(props.filter_num));
        }}
        className="filter_option"
      >
        <a>{props.weekday}</a>
      </li>
    );
  }

  return (
    <div className="body">
      <div className="top_bar">
        <input type={"text"} value={search_txt} className="top_bar_search_box" onChange={set_search_txt} />
        <span className="top_bar_item">/ SEARCH</span>
      </div>
      <ul className="filter_container">
        <Filter_option filter_num="1" weekday="월" />
        <Filter_option filter_num="2" weekday="화" />
        <Filter_option filter_num="3" weekday="수" />
        <Filter_option filter_num="4" weekday="목" />
        <Filter_option filter_num="5" weekday="금" />
        <Filter_option filter_num="6" weekday="토" />
        <Filter_option filter_num="0" weekday="일" />
        <Filter_option filter_num="7" weekday="완결" />
      </ul>
      <Webtoon_area />
      <View_more_webtoon />
    </div>
  );
}
function filter_data(num: number) {
  var change_target_data = webtoon_data.filter(function (element: A_webtoon_info) {
    return element.weekday == num;
  });
  return change_target_data;
}

function search_data(input_txt: string) {
  var change_target_data = webtoon_data.filter(function (element: A_webtoon_info) {
    return element.title.includes(input_txt) || element.artist.includes(input_txt);
  });
  return change_target_data;
}

export default App;
