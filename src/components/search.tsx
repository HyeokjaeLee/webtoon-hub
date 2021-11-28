import { Collapse, Spinner } from "reactstrap";
import { ReactComponent as Close } from "assets/img/close.svg";
import "assets/scss/components/search.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Webtoon from "./webtoon";
import { useInView } from "react-intersection-observer";
const show = {},
  hide: {} | { display: "none" } = { display: "none" };

export default function Search(props: { isOpen: boolean; setIsOpen: Function }) {
  const { isOpen, setIsOpen } = props;
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [webtoonData, setWebtoonData] = useState<Webtoon.Data[]>([]);
  const EMPTY_ELEMENT = [<></>];
  const EMPTY = [<></>];
  const NO_WEBTOON_FOUND = [<li>검색 결과가 없습니다.</li>];
  const LOADING = [
    <li className="search-loading">
      <Spinner />
    </li>,
  ];
  const [MatchingKeywordList, setMatchingKeywordList] = useState(EMPTY);

  useEffect(() => {
    !!searchValue &&
      (async () => {
        setMatchingKeywordList(LOADING);
        const { data }: { data: Webtoon.Data[] } = await axios.get(
          `https://korea-webtoon-api.herokuapp.com/?search=${searchValue}`
        );
        if (Array.isArray(data)) {
          setWebtoonData(data);
          setMatchingKeywordList(
            data.map((webtoon) => (
              <li className="searched-item-wrap">
                <article className="searched-item">
                  <a className="searched-title" onClick={() => {}}>
                    {webtoon.title}
                  </a>
                  <a className="searched-author" onClick={() => {}}>
                    {webtoon.author}
                  </a>
                </article>
              </li>
            ))
          );
        } else {
          setWebtoonData([]);
          setMatchingKeywordList(NO_WEBTOON_FOUND);
        }
      })();
  }, [searchValue]);

  const [ref, inView] = useInView();

  return (
    <Collapse navbar isOpen={isOpen} className="search-collapse">
      <article className="search-wrap">
        <header className="search-header">
          <button
            className="close-button"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Close />
          </button>
          <div className="search-input-wrap">
            <input
              className="search-input"
              placeholder="작품, 작가를 입력하세요"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                const tempKeyword = e.target.value;
                setTimeout(() => {
                  const keyword = e.target.value;
                  keyword === tempKeyword && setSearchValue(keyword);
                }, 500);
              }}
            />
          </div>
        </header>
        <section className="search-contents">
          <ul className="matching-keyword-list">{MatchingKeywordList}</ul>
          <ul className="matching-webtoon-list"></ul>
        </section>
      </article>
    </Collapse>
  );
}

/**  useEffect(() => {
    (async () => {
      if (searchWord.length > 1) {
        setTitleList(SearchLoading);
        const { data }: { data: Webtoon.Data[] } = await axios.get(
          `https://korea-webtoon-api.herokuapp.com/?search=${searchWord}`
        );
        const searchedElement = Array.isArray(data)
          ? data.map((webtoon) => (
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
          : NO_WEBTOON_FOUND;

        if (searchWord.length > 0) {
          setTitleList(searchedElement);
        }
      } else {
        setTitleList([<li></li>]);
      }
    })();
  }, [searchWord]);

  useEffect(() => {
    !!finalWord &&
      (async () => {
        setFinalWebtoon(EMPTY_ELEMENT);
        const { data }: { data: Webtoon.Data[] } = await axios.get(
          `https://korea-webtoon-api.herokuapp.com/?search=${finalWord}`
        );
        const finalWebtoonElement = Array.isArray(data)
          ? data.map((webtoon) => <Webtoon webtoonData={webtoon} />)
          : NO_WEBTOON_FOUND;
        setFinalWebtoon(finalWebtoonElement);
      })();
  }, [finalWord]);
 */

/**
   *             <input
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
                setFinalWebtoon(EMPTY_ELEMENT);
                setTitleList(EMPTY_ELEMENT);
                setMatchKeywordDisplay(show);
                waitKeyword = e.target.value;
                setTempSearchKeyword(e.target.value);
                setTimeout(() => {
                  waitKeyword === e.target.value && setSearchWord(e.target.value);
                }, 300);
              }}
            />
   */
