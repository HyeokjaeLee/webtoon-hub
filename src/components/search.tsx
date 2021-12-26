import { Collapse, Spinner } from "reactstrap";
import { ReactComponent as Close } from "assets/img/close.svg";
import "assets/scss/components/search.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Webtoon from "./webtoon";
import Loading from "./loading";
import { useInView } from "react-intersection-observer";
const display = (value: boolean) => (value ? {} : { display: "none" });
const EMPTY = <></>;
const NO_WEBTOON_FOUND = [<li>검색 결과가 없습니다.</li>];
let part = 2;

export default function Search(props: { isOpen: boolean; setIsOpen: Function }) {
  const { isOpen, setIsOpen } = props;
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [matchingKeywordShow, setMatchingKeywordShow] = useState(true);
  const visibleWebtoonCount = part * 12;
  const [MatchingKeywordList, setMatchingKeywordList] = useState([EMPTY]);
  const [MatchingWebtoonList, setMatchingWebtoonList] = useState([EMPTY]);

  useEffect(() => {
    part = 2;
    !!searchValue
      ? (async () => {
          //element 초기화
          setMatchingWebtoonList([<Loading />]);
          setMatchingKeywordList([<Loading />]);
          const setMatchingWebtoon = (keyword: string) => {
            setInputValue(keyword);
            setSearchValue(keyword);
            setMatchingKeywordShow(false);
          };

          const { data }: { data: Webtoon.Data[] } = await axios.get(
            `https://korea-webtoon-api.herokuapp.com/search?keyword=${searchValue}`
          );
          if (Array.isArray(data)) {
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
            setMatchingKeywordList(NO_WEBTOON_FOUND);
            setMatchingWebtoonList(NO_WEBTOON_FOUND);
          }
        })()
      : setMatchingKeywordList([EMPTY]);
  }, [searchValue]);

  const [moreRef, isMoreRefShow] = useInView();
  isMoreRefShow && part++;
  const More =
    visibleWebtoonCount < MatchingWebtoonList.length && 24 <= MatchingWebtoonList.length ? (
      <li ref={moreRef} className="loading">
        <Spinner />
      </li>
    ) : (
      EMPTY
    );
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
            {VisibleMatchingWebtoonList}
          </ul>
        </section>
      </article>
    </Collapse>
  );
}
