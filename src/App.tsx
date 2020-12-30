import View_a_webtoon from "./components/webtoon_container";
import React, { useState } from "react";
import type { A_webtoon_info, Page_index } from "./modules/base_modules";
import { get_json_data } from "./modules/base_modules";
import "./App.css";
const webtoon_api_url = "https://toy-projects-api.herokuapp.com/webtoon/all";
var today_weeknum = new Date().getDay();
let page_array_num: number = 1;

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

  let total_page_num: number;
  let rest_webtoon_count: number = 0;
  let page_array: Page_index[] = [];
  let total_webtoon_count: number = a_webtoon.length;
  if (total_webtoon_count % 9 == 0) {
    total_page_num = total_webtoon_count / 9;
  } else {
    total_page_num = (total_webtoon_count - (total_webtoon_count % 9)) / 9 + 1;
    rest_webtoon_count = total_webtoon_count % 9;
  }
  for (let i: number = 1; i <= total_page_num; i++) {
    if (i < total_page_num) {
      page_array[i] = {
        page_item_start_num: (i - 1) * 9,
        page_item_end_num: (i - 1) * 9 + 9,
      };
    } else {
      page_array[i] = {
        page_item_start_num: (i - 1) * 9,
        page_item_end_num: (i - 1) * 9 + rest_webtoon_count,
      };
    }
  }

  const [view_start_num, change_view_start_num] = useState(0);
  const [view_end_num, change_view_end_num] = useState(9);

  //검색 기능
  const [search_txt, change_search_txt] = useState("");
  const [fully_loading, change_fully_loading] = useState(false);
  const set_search_txt = (e: any) => {
    change_search_txt(e.target.value);
    if (e.target.value == "") {
      change_fully_loading(false);
      change_target_data(filtering_data);
    } else {
      change_fully_loading(true);
      change_target_data(search_data(e.target.value));
    }
  };

  //페이지 인덱스
  const page_index_maker = (first_page_array_num: number) => {
    let index: number[] = [];
    for (let i = 0; i < 6; i++) {
      index[i] = first_page_array_num + i;
    }
    return index;
  };

  //하단 페이지 : 이동

  const change_view_index = (num: number): void => {
    change_view_start_num(page_array[num].page_item_start_num);
    change_view_end_num(page_array[num].page_item_end_num);
  };
  //하단 페이지 : 보여지는 숫자값 변경&이동
  const [page_index, part_of_change_page_index] = useState(page_index_maker(page_array_num));
  const change_page_index = (num: number): void => {
    part_of_change_page_index(page_index_maker(num));
    change_view_index(num);
  };

  //하단 페이지 : 한번에 크게 이동
  const View_more_webtoon = (prop: any) => {
    return (
      <a
        className="view_select_item"
        onClick={() => {
          switch (prop.move) {
            case ">":
              if (page_array_num + 10 < total_page_num) {
                page_array_num = page_array_num + 5;
                change_page_index(page_array_num);
              } else if (page_array_num + 5 < total_page_num) {
                page_array_num = total_page_num - 5;
                change_page_index(page_array_num);
              }
              break;
            case "<":
              if (page_array_num - 5 > 1) {
                page_array_num = page_array_num - 5;
                change_page_index(page_array_num);
              } else if (page_array_num != 1) {
                page_array_num = 1;
                change_page_index(page_array_num);
              }
              break;
          }
        }}
      >
        {prop.txt}
      </a>
    );
  };
  const Webtoon_area = () => {
    let viewing_webtoon: JSX.Element[] = a_webtoon.slice(view_start_num, view_end_num);
    if (fully_loading) {
      viewing_webtoon = a_webtoon;
    } else {
      viewing_webtoon = a_webtoon.slice(view_start_num, view_end_num);
    }
    return <ul className="content_area">{viewing_webtoon}</ul>;
  };

  const View_page_index = () => {
    let view_page_index: JSX.Element[] = [];
    for (let i = 0; i < 6; i++) {
      view_page_index.push(
        <a
          className="view_select_item"
          onClick={() => {
            change_view_index(page_index[i]);
            window.scrollTo(0, 0);
          }}
        >
          {page_index[i]}
        </a>,
      );
    }
    if (fully_loading != true) {
      return (
        <span className="view_select">
          <View_more_webtoon move="<" txt="<" />
          {view_page_index}
          <View_more_webtoon move=">" txt=">" />
        </span>
      );
    } else {
      return <span className="view_select" />;
    }
  };

  const Webtoon_filter = () => {
    let options: JSX.Element[] = [];
    const index: string[] = ["일", "월", "화", "수", "목", "금", "토", "완결"];
    const Filter_option = (prop: any) => {
      return (
        <li className="filter_option">
          <a
            id={prop.id}
            onClick={() => {
              change_search_txt("");
              change_fully_loading(false);
              change_target_data(filter_data(prop.filter_num));
              page_array_num = 1;
              change_view_start_num(0);
              change_view_end_num(9);
              window.scrollTo(0, 0);
            }}
          >
            {prop.weekday}
          </a>
        </li>
      );
    };
    for (let i = 0; i < 8; i++) {
      options[i] = <Filter_option filter_num={i} weekday={index[i]} id={"option_" + i} />;
    }
    return <ul className="filter_container">{options}</ul>;
  };
  return (
    <div className="body">
      <div className="top_bar">
        <input type={"text"} value={search_txt} className="top_bar_search_box" onChange={set_search_txt} />
        <span className="top_bar_item">/SEARCH</span>
      </div>
      <Webtoon_filter />
      <Webtoon_area />
      <View_page_index />
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
