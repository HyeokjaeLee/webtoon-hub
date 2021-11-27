import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Spinner,
} from "reactstrap";
import { ReactComponent as Close } from "assets/img/close.svg";
import { WebtoonData } from "contexts/webtoon-data";
import "assets/scss/components/search.scss";
import axios from "axios";
import { useContext, useEffect, useState, Dispatch, SetStateAction } from "react";
import Webtoon from "./webtoon";
const show = {},
  hide: {} | { display: "none" } = { display: "none" };

export default function Search(props: { isOpen: boolean; setIsOpen: Function }) {
  const EMPTY_ELEMENT = [<></>];
  const [tempSearchKeyword, setTempSearchKeyword] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [finalWord, setFinalWord] = useState("");
  const [finalWebtoon, setFinalWebtoon] = useState(EMPTY_ELEMENT);
  const [matchKeywordDisplay, setMatchKeywordDisplay] = useState(hide);
  const { isOpen, setIsOpen } = props;
  const [titleList, setTitleList] = useState(EMPTY_ELEMENT);
  const SearchLoading = [
    <li className="search-loading">
      <Spinner />
    </li>,
  ];
  let waitKeyword: string;
  const if_data_exist = (data: Webtoon.Data[], result: JSX.Element[]) =>
    data.length > 0 ? result : [<li>검색 결과가 없습니다.</li>];

  useEffect(() => {
    (async () => {
      if (searchWord.length > 1) {
        setTitleList(SearchLoading);
        const { data }: { data: Webtoon.Data[] } = await axios.get(
          `https://korea-webtoon-api.herokuapp.com/?search=${searchWord}`
        );
        const searchedElement = if_data_exist(
          data,
          data.map((webtoon) => (
            <li className="searched-item-wrap">
              <article className="searched-item">
                <a
                  className="searched-title"
                  onClick={() => {
                    setTempSearchKeyword(webtoon.title);
                    setSearchWord(webtoon.title);
                    setMatchKeywordDisplay(hide);
                    setFinalWord(webtoon.title);
                  }}
                >
                  {webtoon.title}
                </a>
                <a
                  className="searched-author"
                  onClick={() => {
                    setTempSearchKeyword(webtoon.author);
                    setSearchWord(webtoon.author);
                    setMatchKeywordDisplay(hide);
                    setFinalWord(webtoon.author);
                  }}
                >
                  {webtoon.author}
                </a>
              </article>
            </li>
          ))
        );

        if (searchWord.length > 0) {
          setTitleList(searchedElement);
        }
      } else {
        setTitleList([<li></li>]);
      }
    })();
  }, [searchWord]);

  useEffect(() => {
    setFinalWebtoon(SearchLoading);
    !!finalWord &&
      (async () => {
        const { data }: { data: Webtoon.Data[] } = await axios.get(
          `https://korea-webtoon-api.herokuapp.com/?search=${finalWord}`
        );
        const finalWebtoonElement = if_data_exist(
          data,
          data.map((webtoon) => <Webtoon webtoonData={webtoon} />)
        );
        setFinalWebtoon(finalWebtoonElement);
      })();
  }, [finalWord]);

  return (
    <Collapse navbar isOpen={isOpen} className="search-collapse">
      <nav className="search-nav">
        <div>
          <button
            className="close-button"
            onClick={() => {
              setIsOpen(!isOpen);
              setSearchWord("");
              setTempSearchKeyword("");
              setFinalWebtoon(EMPTY_ELEMENT);
            }}
          >
            <Close />
          </button>
        </div>
        <div className="search-input-wrap">
          <input
            className="search-input"
            placeholder="작품, 작가를 입력하세요"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setFinalWord(searchWord);
                setMatchKeywordDisplay(hide);
              }
            }}
            value={tempSearchKeyword}
            onChange={(e) => {
              setMatchKeywordDisplay(show);
              waitKeyword = e.target.value;
              setTempSearchKeyword(e.target.value);
              setTimeout(() => {
                waitKeyword === e.target.value && setSearchWord(e.target.value);
              }, 300);
            }}
          />
        </div>
      </nav>
      <section className="search-result">
        <ul className="match-keyword-list" style={matchKeywordDisplay}>
          {titleList}
        </ul>
        <ul style={matchKeywordDisplay === hide ? show : hide} className="final-webtoon-list">
          {finalWebtoon}
        </ul>
      </section>
    </Collapse>
  );
}
