import View_a_webtoon from "./components/webtoon_container";
import KakaoSignUp from "./components/kakao_login.jsx";
import React, { useState } from "react";
import type { A_webtoon_info, Page_index } from "./modules/base_modules";
import { get_json_data, empty_webtoon } from "./modules/base_modules";
import Modal from "react-modal";
import "./App.css";

const webtoon_api_url = "https://toy-projects-api.herokuapp.com/webtoon/all";
const today_weeknum = new Date().getDay();
const view_webtoon_count: number = 24;
const webtoon_data: A_webtoon_info[] = get_json_data(webtoon_api_url);
const categorization_webtoon_data: [] = [];

const classify_webtoon = (webtoon_data: A_webtoon_info[], view_webtoon_count: number) => {
  //요일별로 분류
  const weekday_webtoon = (week_num: number): A_webtoon_info[] => {
    let weekday_webtoon_data = webtoon_data.filter(function (element: A_webtoon_info) {
      return element.weekday == week_num;
    });
    return weekday_webtoon_data;
  };
  //한페이지에 보여줄 갯수로 묶음
  const partition_webtoon = (weekday_webtoon_data: A_webtoon_info[], view_webtoon_count: number) => {
    let partition_webtoon_data: A_webtoon_info[][] = [];
    const weekday_webtoon_count: number = weekday_webtoon_data.length;
    const rest_webtoon_count: number = weekday_webtoon_count % view_webtoon_count;
    if (rest_webtoon_count == 0) {
      const partition_count = weekday_webtoon_count / view_webtoon_count;
      for (let i = 0; i < partition_count; i++) {
        partition_webtoon_data.push(weekday_webtoon_data.slice(i * view_webtoon_count, i * view_webtoon_count + view_webtoon_count));
      }
    } else {
      const partition_count = (weekday_webtoon_count - rest_webtoon_count) / view_webtoon_count;
      for (let i = 0; i < partition_count; i++) {
        partition_webtoon_data.push(weekday_webtoon_data.slice(i * view_webtoon_count, i * view_webtoon_count + view_webtoon_count));
      }
      partition_webtoon_data.push(weekday_webtoon_data.slice(weekday_webtoon_count - rest_webtoon_count - 1, weekday_webtoon_count - 1));
    }
    return partition_webtoon_data;
  };

  let classify_webtoon_data: A_webtoon_info[][][] = [];
  for (let i = 0; i < 8; i++) {
    classify_webtoon_data.push(partition_webtoon(weekday_webtoon(i), view_webtoon_count));
  }
  return classify_webtoon_data;
};

//const htmlTitle: any = document.querySelector("title");
//htmlTitle.innerText = "WEBTOON HUB";

const customStyles = {
  content: {
    top: "50%",
    height: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

function App() {
  //modal
  var subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#101820";
    subtitle.style.fontFamily = "main_font";
  }

  function closeModal() {
    setIsOpen(false);
  }

  //초기 값은 오늘날짜 웹툰
  const [target_data, change_target_data] = useState<A_webtoon_info[]>(
    webtoon_data.filter(function (element: A_webtoon_info) {
      return element.weekday == today_weeknum;
    }),
  );

  const [Userid, setUserid] = useState("Guest");
  let webtoons: JSX.Element[] = target_data.map((target_data, index: number) => (
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

  const [viewing_first_page_num, set_viewing_first_page_num] = useState(1);

  const get_page_num_info = (total_webtoon_count: number) => {
    let total_page_num: number;
    let rest_webtoon_count: number = 0;
    if (total_webtoon_count % view_webtoon_count == 0) {
      total_page_num = total_webtoon_count / view_webtoon_count;
    } else {
      total_page_num = (total_webtoon_count - (total_webtoon_count % view_webtoon_count)) / view_webtoon_count + 1;
      rest_webtoon_count = total_webtoon_count % view_webtoon_count;
    }
    return {
      total_page_num: total_page_num,
      rest_webtoon_count: rest_webtoon_count,
    };
  };

  const get_page_detail_info_array = (total_page_num: number, rest_webtoon_count: number): Page_index[] => {
    let page_array: Page_index[] = [];
    for (let i: number = 1; i <= total_page_num; i++) {
      if (i < total_page_num) {
        page_array[i] = {
          page_item_start_num: (i - 1) * view_webtoon_count,
          page_item_end_num: (i - 1) * view_webtoon_count + view_webtoon_count,
        };
      } else {
        page_array[i] = {
          page_item_start_num: (i - 1) * view_webtoon_count,
          page_item_end_num: (i - 1) * view_webtoon_count + rest_webtoon_count,
        };
      }
    }
    return page_array;
  };

  let page_num_info = get_page_num_info(webtoons.length);
  let total_page_num: number = page_num_info.total_page_num;
  let rest_webtoon_count: number = page_num_info.rest_webtoon_count;
  let page_array: Page_index[] = get_page_detail_info_array(total_page_num, rest_webtoon_count);

  const [view_start_num, change_view_start_num] = useState(0);
  const [view_end_num, change_view_end_num] = useState(view_webtoon_count);

  //검색전 보던 페이지 저장
  const [save_page, set_save_page] = useState<A_webtoon_info[]>(empty_webtoon);
  const make_save_page = () => {
    set_save_page(target_data);
  };

  //검색 기능
  const [search_txt, change_search_txt] = useState("");
  const [fully_loading, change_fully_loading] = useState(false);

  function search_data(input_txt: string) {
    var change_target_data = webtoon_data.filter(function (element: A_webtoon_info) {
      return element.title.includes(input_txt) || element.artist.includes(input_txt);
    });
    return change_target_data;
  }

  const set_search_txt = (e: any) => {
    change_search_txt(e.target.value);
    if (e.target.value == "") {
      change_fully_loading(false);
      change_target_data(save_page);
    } else {
      change_fully_loading(true);
      change_target_data(search_data(e.target.value));
    }
  };

  //페이지 인덱스
  const page_index_maker = (first_viewing_first_page_num: number) => {
    let index: number[] = [];
    for (let i = 0; i < 6; i++) {
      if (first_viewing_first_page_num + i <= total_page_num) {
        index.push(first_viewing_first_page_num + i);
      }
    }
    return index;
  };

  //하단 페이지 : 이동
  const change_view_index = (num: number): void => {
    change_view_start_num(page_array[num].page_item_start_num);
    change_view_end_num(page_array[num].page_item_end_num);
  };
  //하단 페이지 : 보여지는 숫자값 변경&이동
  const [page_index, set_page_index] = useState(page_index_maker(viewing_first_page_num));
  const change_page_index = (num: number): void => {
    set_page_index(page_index_maker(num));
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
              if (viewing_first_page_num < total_page_num) {
                set_viewing_first_page_num(viewing_first_page_num + 5);
                change_page_index(viewing_first_page_num);
              }
              break;
            case "<":
              if (viewing_first_page_num - 5 > 1) {
                set_viewing_first_page_num(viewing_first_page_num - 5);
                change_page_index(viewing_first_page_num);
              } else if (viewing_first_page_num != 1) {
                set_viewing_first_page_num(1);
                change_page_index(1);
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
    let viewing_webtoon: JSX.Element[] = webtoons.slice(view_start_num, view_end_num);
    if (fully_loading) {
      viewing_webtoon = webtoons;
    } else {
      viewing_webtoon = webtoons.slice(view_start_num, view_end_num);
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
    function filter_data(num: number) {
      var change_target_data = webtoon_data.filter(function (element: A_webtoon_info) {
        return element.weekday == num;
      });
      return change_target_data;
    }

    let options: JSX.Element[] = [];
    const index: string[] = ["일", "월", "화", "수", "목", "금", "토", "완결"];
    const Filter_option = (prop: any) => {
      return (
        <li className="filter_option">
          <a
            id={prop.id}
            onClick={() => {
              change_target_data(filter_data(prop.filter_num));
              change_search_txt("");
              change_fully_loading(false);
              set_viewing_first_page_num(1);
              change_page_index(viewing_first_page_num);
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
        <input type={"text"} value={search_txt} className="top_bar_search_box" onClick={make_save_page} onChange={set_search_txt} />
        <span className="top_bar_item">
          /SEARCH
          <li style={{ paddingLeft: "20px" }} onClick={openModal}>
            Login
          </li>
          <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>WEBTOONHUB</h2>
            <KakaoSignUp setUserid={setUserid} />
          </Modal>
        </span>
      </div>
      <Webtoon_filter />
      <Webtoon_area />
      <View_page_index />
      {Userid}
    </div>
  );
}

export default App;
