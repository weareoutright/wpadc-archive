import { useState } from "react";
import Image from "next/image";
import SEARCH_BTN from "../../assets/search-bar/search-icon.svg";
import SORT_DOWN_ARROW from "../../assets/search-bar/sort-down-arrow.svg";

const FILTER_PILL_BTNS_DUMMY = [
  "Year",
  "Artist",
  "Curator",
  "Location",
  "Medium",
  "Program Type",
  "Document Type",
];

export default function SearchBar({
  searchKeyword,
  setSearchKeyword,
  debouncedKeyword,
  isFrontPage,
}) {
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchKeyword(e.target.value);
  };

  const openSortMenu = (e) => {
    e.preventDefault();
    console.log("open sort menu");
  };

  const applyFilter = (e, filter) => {
    e.preventDefault();
    console.log(filter);
  };

  const performSearch = (e, keyword) => {
    e.preventDefault();
    console.log(keyword);
  };

  return (
    <div className={`search-bar ${isFrontPage && "front-page-search-bar"}`}>
      <div className="search-and-icon">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Exhibits in the 1980s..."
            onChange={(e) => handleSearch(e)}
            value={searchKeyword}
            name="searchKeyword"
          />
        </form>
        <a
          className="search-btn"
          href="#"
          onClick={(e) => performSearch(e, debouncedKeyword)}
        >
          <Image src={SEARCH_BTN} alt="search the archive" />
        </a>
      </div>
      <div className="filter-pills">
        <div className="main-filters">
          {FILTER_PILL_BTNS_DUMMY.map((pill_btn) => {
            return (
              <a
                onClick={(e) => applyFilter(e, pill_btn)}
                className="pill-btn"
                key={pill_btn}
              >
                {pill_btn}
              </a>
            );
          })}
        </div>
        <a
          className="pill-btn sort-btn"
          href="#"
          alt="sort results"
          onClick={(e) => openSortMenu(e)}
        >
          Sort <Image src={SORT_DOWN_ARROW} alt="sort results" />
        </a>
      </div>
    </div>
  );
}
