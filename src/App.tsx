import React, { useState } from 'react';
import './App.css';
const webtoon_api_url = "https://toy-projects-api.herokuapp.com/webtoon/all";
var webtoon_data:any;
var today_weeknum = new Date().getDay();
var filtering_data = new Array();

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
//검색 기능
const [search_txt, change_search_txt] = useState("");
const set_search_txt = (e:any) => {
  change_search_txt(e.target.value);
  if (e.target.value == "") {
    change_target_data(filtering_data);
  } else {
    change_target_data(search_data(e.target.value));
  }
};
let [target_data, change_target_data] = useState(filtering_data);
const Webtoon_area = () => {
  const a_webtoon = target_data.map((target_data) => (
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
            <li style={{ fontSize: "10px", listStyle: "none" }}>
              {target_data.title}
            </li>
            <li style={{ fontSize: "8px", listStyle: "none" }}>
              {target_data.artist}
            </li>
          </ul>
        </div>
        <div className="thumnail">
          <img src={target_data.img} className="thumnail_img" />
        </div>
      </li>
    </a>
  ));
  return <ul className="content_area">{a_webtoon}</ul>;
};
function Filter_option(props:any) {
  return (
    <li
      onClick={() => {
        change_target_data(filter_data(props.filter_num));
      }}
      className="filter_option"
    >
      <a href="#">{props.weekday}</a>
    </li>
  );
}


return (
  <div className="body">
    <div className="top_bar">
      <input
        type={"text"}
        value={search_txt}
        className="top_bar_search_box"
        onChange={set_search_txt}
      />
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
  </div>
);
}
function filter_data(num:number) {
  var change_target_data = webtoon_data.filter(function (element:A_webtoon_info) {
    return element.weekday == num;
  });
  return change_target_data;
}

function search_data(input_txt:string) {
  var change_target_data = webtoon_data.filter(function (element:A_webtoon_info) {
    return (
      element.title.includes(input_txt) || element.artist.includes(input_txt)
    );
  });
  return change_target_data;
}

function ajax_get(url:string, callback:any) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log("responseText:" + xmlhttp.responseText);
      try {
        var data = JSON.parse(xmlhttp.responseText);
      } catch (err) {
        console.log(err.message + " in " + xmlhttp.responseText);
        return;
      }
      callback(data);
    }
  };
  xmlhttp.open("GET", url, false); //true는 비동기식, false는 동기식 true로 할시 변수 변경전에 웹페이지가 떠버림
  xmlhttp.send();
}
ajax_get(webtoon_api_url, function (data:any) {
  webtoon_data = data;
  filtering_data = webtoon_data.filter(function (element:A_webtoon_info) {
        return element.weekday == today_weeknum;
  });
});
export default App;
