import View_a_webtoon from "./components/webtoon_container";
import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import type { A_webtoon_info } from "./modules/base_modules";
import { get_json_data } from "./modules/base_modules";
import "./App.css";
const webtoon_api_url = "https://toy-projects-api.herokuapp.com/webtoon/all";
var today_weeknum = new Date().getDay();
let view_count = 9;

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

let webtoon_data: A_webtoon_info[] = get_json_data(webtoon_api_url);
let filtering_data: A_webtoon_info[] = webtoon_data.filter(function (element: A_webtoon_info) {
  return element.weekday == today_weeknum;
});

function App() {
  const htmlTitle: any = document.querySelector("title");
  htmlTitle.innerText = "WEBTOON HUB";
  const [target_data, change_target_data] = useState(filtering_data);
  const webtoon_view_rendering = () => {};
  const a_webtoon: JSX.Element[] = target_data.map((target_data, index: number) => (
    <View_a_webtoon
      key={index}
      title={target_data.title}
      url={target_data.url}
      img={target_data.img}
      artist={target_data.artist}
      service={target_data.service}
      state={target_data.state}
      weekday={target_data.weekday}
    ></View_a_webtoon>
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
  const [view_webtoon_count, change_view_webtoon_count] = useState(9);
  const Webtoon_area = () => {
    let view_webtoon = a_webtoon.slice(0, view_webtoon_count);
    return <ul className="content_area">{view_webtoon}</ul>;
  };

  const View_more_webtoon = () => {
    return (
      <a
        onClick={() => {
          view_count = view_count + 9;
          change_view_webtoon_count(view_count);
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
          view_count = 9;
          change_view_webtoon_count(view_count);
          change_target_data(filter_data(props.filter_num));
        }}
        className="filter_option"
      >
        <a>{props.weekday}</a>
      </li>
    );
  }

  return (
    <div
      className="body"
      onScroll={() => {
        view_count = view_count + 9;
        change_view_webtoon_count(view_count);
      }}
    >
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
