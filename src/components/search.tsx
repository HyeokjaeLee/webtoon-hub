import { Collapse, Spinner } from "reactstrap";
import { ReactComponent as Close } from "assets/img/close.svg";
import "assets/scss/components/search.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Webtoon from "./webtoon";
import { useInView } from "react-intersection-observer";
let part = 1;
const display = (value: boolean) => (value ? {} : { display: "none" });
const EMPTY = [<></>];
const NO_WEBTOON_FOUND = [<li>검색 결과가 없습니다.</li>];
const LOADING = [
  <li className="search-loading">
    <Spinner />
  </li>,
];

export default function Search(props: { isOpen: boolean; setIsOpen: Function }) {
  const { isOpen, setIsOpen } = props;
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [matchingKeywordShow, setMatchingKeywordShow] = useState(true);

  const [webtoonData, setWebtoonData] = useState<Webtoon.Data[]>([]);
  const WEBTOON_COUNT_OF_PART = part * 12;
  const WEBTOON_COUNT = webtoonData.length;
  const [MatchingKeywordList, setMatchingKeywordList] = useState(EMPTY);
  const [MatchingWebtoonList, setMatchingWebtoonList] = useState(EMPTY);

  useEffect(() => {
    part = 1;
    !!searchValue
      ? (async () => {
          //element 초기화
          setMatchingWebtoonList(LOADING);
          setMatchingKeywordList(LOADING);
          const setMatchingWebtoon = (keyword: string) => {
            setInputValue(keyword);
            setSearchValue(keyword);
            setMatchingKeywordShow(false);
          };

          const { data }: { data: Webtoon.Data[] } = await axios.get(
            `https://korea-webtoon-api.herokuapp.com/?search=${searchValue}`
          );
          if (Array.isArray(data)) {
            setWebtoonData(data);
            setMatchingKeywordList(
              data.map((webtoon) => (
                <li className="searched-item-wrap">
                  <article className="searched-item">
                    <a
                      className="searched-title"
                      onClick={() => {
                        setMatchingWebtoon(webtoon.title);
                      }}
                    >
                      {webtoon.title}
                    </a>
                    <a
                      className="searched-author"
                      onClick={() => {
                        setMatchingWebtoon(webtoon.author);
                      }}
                    >
                      {webtoon.author}
                    </a>
                  </article>
                </li>
              ))
            );
            setMatchingWebtoonList(data.map((webtoon) => <Webtoon webtoonData={webtoon} />));
          } else {
            setWebtoonData([]);
            setMatchingKeywordList(NO_WEBTOON_FOUND);
            setMatchingWebtoonList(NO_WEBTOON_FOUND);
          }
        })()
      : setMatchingKeywordList(EMPTY);
  }, [searchValue]);

  const [moreRef, isMoreRefShow] = useInView();
  isMoreRefShow && part++;
  const More = WEBTOON_COUNT_OF_PART < WEBTOON_COUNT ? <li ref={moreRef}></li> : <></>;
  const VisibleMatchingWebtoonList = MatchingWebtoonList.slice(0, part * 12);
  VisibleMatchingWebtoonList.push(More);
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
          <input
            className="search-input"
            placeholder="작품, 작가를 입력하세요"
            value={inputValue}
            onChange={(e) => {
              setMatchingKeywordShow(true);
              setInputValue(e.target.value);
              const tempKeyword = e.target.value;
              setTimeout(() => {
                const keyword = e.target.value;
                keyword === tempKeyword && setSearchValue(keyword);
              }, 500);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !!inputValue) {
                setSearchValue(inputValue);
                setMatchingKeywordShow(false);
              }
            }}
          />
        </header>
        <section className="search-contents">
          <ul className="matching-keyword-list" style={display(matchingKeywordShow)}>
            {MatchingKeywordList}
          </ul>
          <ul className="matching-webtoon-list" style={display(!matchingKeywordShow)}>
            {MatchingWebtoonList.slice(0, part * 12)}
            {More}
          </ul>
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
