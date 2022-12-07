import scss from "./SearchButton.module.scss";
import { Search } from "assets/svg";
export const SearchButton = () => {
  return (
    <button className={scss["search-button"]}>
      <Search color="white" />
    </button>
  );
};
