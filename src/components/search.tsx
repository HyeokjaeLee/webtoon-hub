import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import { ReactComponent as Close } from "assets/img/close.svg";
import { WebtoonData } from "contexts/webtoon-data";
import "assets/scss/components/search.scss";
import { useContext, useEffect, useState, Dispatch, SetStateAction } from "react";
export default function Search(props: { isOpen: boolean; setIsOpen: Function }) {
  const webtoonData = useContext(WebtoonData).data;
  const [searchWord, setSearchWord] = useState("");
  const [test, setTest]: any = useState({ display: "none" });
  const { isOpen, setIsOpen } = props;
  const [titleList, setTitleList] = useState([<></>]);
  const test3 = ["123", "123", "1234"];
  console.log(test3);
  console.log([...new Set(test3)]);
  useEffect(() => {
    if (searchWord.length > 1) {
      const filteredWebtoonData = webtoonData.filter((webtoon) => {
        const str4search = webtoon.title.toLowerCase() + webtoon.author.toLowerCase();
        return str4search.includes(searchWord.toLowerCase());
      });
      const titleAndAuthorList = [
        ...new Set(
          filteredWebtoonData.map((webtoon) => {
            const { title, author } = webtoon;
            return `${title}SplitPoint${author}`;
          })
        ),
      ];
      console.log(titleAndAuthorList);
      const filteredTitle = titleAndAuthorList.map((webtoon) => (
        <li className="title-link-wrap">
          <span>
            <a
              onClick={() => {
                setSearchWord(webtoon.split("SplitPoint")[0]);
                setTest({ display: "none" });
              }}
              className="title-link"
            >
              <span className="title">{webtoon.split("SplitPoint")[0]}</span>
              <span className="author">{webtoon.split("SplitPoint")[1]}</span>
            </a>
          </span>
        </li>
      ));
      setTitleList(filteredTitle);
    } else setTitleList([<></>]);
  }, [searchWord]);

  return (
    <Collapse navbar isOpen={isOpen} className="search-collapse">
      <nav className="search-nav">
        <div>
          <button
            className="close-button"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <Close />
          </button>
        </div>
        <div className="search-input-wrap">
          <input
            className="search-input"
            placeholder="작품, 작가를 입력하세요"
            value={searchWord}
            onKeyPress={(e) => {
              e.key === "Enter" && setTest({ display: "none" });
            }}
            onClick={(e) => {
              setTest({});
            }}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
          />
        </div>
      </nav>
      <section className="search-result">
        <ul style={test}>{titleList}</ul>
      </section>
    </Collapse>
  );
}
