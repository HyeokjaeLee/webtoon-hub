import View_a_webtoon from "./components/webtoon_container";
import KakaoSignUp from "./components/kakao_login.jsx";
import React, { useState } from "react";
import type { A_webtoon_info } from "./modules/base_modules";
import { get_json_data } from "./modules/base_modules";
import { assemble_parts, search_data } from "./modules/classify_webtoon";
import Modal from "react-modal";
import "./App.css";
//View Setting
const a_page_webtoon_view_count = 12; //한페이지에 보여줄 웹툰 갯수
const a_page_index_view_count = 5; //한페이지에 보여줄 페이지 구분 갯수
const webtoon_api_url = "https://toy-projects-api.herokuapp.com/webtoon/all";
const today_weeknum = new Date().getDay();
const webtoon_data: A_webtoon_info[] = get_json_data(webtoon_api_url);
const classify_webtoon_data = assemble_parts(webtoon_data, a_page_webtoon_view_count);
const week_index_array: string[] = ["일", "월", "화", "수", "목", "금", "토", "완결"];
let page_index = 0;
let week_index = today_weeknum;

const convert_data_to_view = (viewing_data: A_webtoon_info[]) => {
  const result: JSX.Element[] = viewing_data.map((viewing_data, index: number) => (
    <View_a_webtoon
      key={index}
      title={viewing_data.title}
      url={viewing_data.url}
      img={viewing_data.img}
      artist={viewing_data.artist}
      service={viewing_data.service}
      state={viewing_data.state}
      weekday={viewing_data.weekday}
    />
  ));
  return result;
};

const customStyles = {
  content: {
    top: "0%",
    height: "100%",
    left: "auto",
    right: "0%",
    bottom: "auto",
  },
};
Modal.setAppElement("#root");

function App() {
  const [viewing_title, set_viewing_title] = useState(week_index_array[week_index] + "요 웹툰");
  //modal
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
    if (Userid != "Guest") {
      closeModal();
    }
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
  const [viewing_data, change_viewing_data] = useState<A_webtoon_info[]>(classify_webtoon_data[week_index][page_index]);

  const set_viewing_data = (week_num: number, page_num: number): void => {
    change_fully_loading(false);
    week_index = week_num;
    page_index = page_num;
    if (week_index < 7) {
      set_viewing_title(week_index_array[week_index] + "요 웹툰");
    } else {
      set_viewing_title(week_index_array[week_index] + " 웹툰");
    }
    change_viewing_data(classify_webtoon_data[week_index][page_index]);
    set_view_page_index(create_view_page_index(make_page_index_array(classify_webtoon_data[week_index]), page_index, a_page_index_view_count));
    window.scrollTo(0, 0);
  };

  const [Userid, setUserid] = useState("Guest");
  const viewing_webtoons = convert_data_to_view(viewing_data);

  //검색전 보던 페이지 저장
  const [save_page, set_save_page] = useState<A_webtoon_info[]>(viewing_data);

  //검색 기능
  const [search_txt, change_search_txt] = useState("");
  const [fully_loading, change_fully_loading] = useState(false);
  const set_search_txt = (e: any) => {
    change_search_txt(e.target.value);
    if (e.target.value == "") {
      change_fully_loading(false);
      change_viewing_data(save_page);
    } else {
      change_fully_loading(true);
      change_viewing_data(search_data(e.target.value, webtoon_data));
    }
  };

  //하단 페이지 : 한번에 크게 이동
  const View_more_webtoon = (prop: any) => {
    let data_length: number = classify_webtoon_data[week_index].length;
    return (
      <li>
        <a
          className="view_select_item"
          onClick={() => {
            switch (prop.move) {
              case ">":
                if (page_index + a_page_index_view_count < data_length) {
                  set_viewing_data(week_index, page_index + a_page_index_view_count);
                }
                break;
              case "<":
                if (page_index > a_page_index_view_count) {
                  set_viewing_data(week_index, page_index - a_page_index_view_count);
                } else if (page_index != 0) {
                  page_index = 0;
                  set_viewing_data(week_index, page_index);
                }
                break;
            }
          }}
        >
          {prop.txt}
        </a>
      </li>
    );
  };

  const make_page_index_array = (viewing_data: A_webtoon_info[][]) => {
    let result: number[] = [];
    const data_length: number = viewing_data.length;
    for (let i = 1; i <= data_length; i++) {
      result.push(i);
    }
    return result;
  };

  const Filter_option = (prop: any) => {
    return (
      <li className="filter_option">
        <a
          id={prop.id}
          onClick={() => {
            set_viewing_data(prop.week_num, prop.page_num);
          }}
        >
          {prop.txt}
        </a>
      </li>
    );
  };

  const create_view_page_index = (index_array: number[], start_num: number, view_count: number) => {
    const result: JSX.Element[] = index_array
      .map((data) => <Filter_option week_num={week_index} page_num={data - 1} txt={data} />)
      .slice(start_num, start_num + view_count);
    return result;
  };

  const [view_page_index, set_view_page_index] = useState(
    create_view_page_index(make_page_index_array(classify_webtoon_data[week_index]), 0, a_page_index_view_count),
  );

  const Webtoon_filter = () => {
    let options: JSX.Element[] = [];
    for (let i = 0; i < 8; i++) {
      options[i] = <Filter_option week_num={i} page_num={0} txt={week_index_array[i]} />;
    }
    return <ul className="filter_container">{options}</ul>;
  };
  const Webtoon_area = () => {
    if (fully_loading) {
    }
    return (
      <div>
        <ul className="content_area">{viewing_webtoons}</ul>
      </div>
    );
  };
  const Page_index_area = () => {
    if (fully_loading) {
      return <></>;
    } else {
      return (
        <>
          <View_more_webtoon move="<" txt="<" />
          {view_page_index}
          <View_more_webtoon move=">" txt=">" />
        </>
      );
    }
  };

  return (
    <div className="body">
      <div className="top_bar">
        <span className="top_bar_item">{viewing_title}</span>
        <input
          placeholder="SEARCH"
          type={"text"}
          value={search_txt}
          className="top_bar_search_box"
          onClick={() => {
            set_save_page(viewing_data);
          }}
          onChange={set_search_txt}
        />
        <span className="top_bar_item">
          <li style={{ paddingLeft: "20px" }} onClick={openModal}>
            MY
          </li>
          <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
            <a onClick={closeModal} style={{ float: "right" }}>
              CLOSE
            </a>
            <br />
            {Userid}
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>WEBTOONHUB</h2>
            <KakaoSignUp setUserid={setUserid} />
          </Modal>
        </span>
      </div>
      <Webtoon_filter />
      <Webtoon_area />
      <span className="view_select" style={{ paddingTop: "2.5%" }}>
        <Page_index_area />
      </span>
    </div>
  );
}

export default App;
