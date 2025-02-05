import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import SEARCH_BTN from "../../assets/search-bar/search-icon.svg";
import SORT_DOWN_ARROW from "../../assets/search-bar/sort-down-arrow.svg";
import { validate } from "graphql";

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
  isFrontPage,
  setResults,
  results,
}) {
  const router = useRouter();
  const [localKeyword, setLocalKeyword] = useState("");

  const handleSearch = (e) => {
    if (isFrontPage) setLocalKeyword(e.target.value);
    else setSearchKeyword(e.target.value);
  };

  const performSearch = () => {
    if (results?.length > 0) setResults([]);
    if (isFrontPage & localKeyword)
      router.push(`/search?keyword=${encodeURIComponent(localKeyword)}`);
    // else router.push(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
  };

  return (
    <div className={`search-bar ${isFrontPage ? "front-page-search-bar" : ""}`}>
      <div
        className={`search-and-icon ${
          isFrontPage ? "front-page-search-and-icon" : ""
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            performSearch();
          }}
        >
          <input
            type="text"
            placeholder="Exhibits in the 1980s..."
            onChange={(e) => {
              e.preventDefault();
              handleSearch(e);
            }}
            value={searchKeyword === "undefined" ? "" : searchKeyword}
            name="searchKeyword"
          />
          <button className="search-btn" type="submit">
            <Image src={SEARCH_BTN} alt="search the archive" />
          </button>
        </form>
      </div>
      <div className="filter-pills">
        <div className="main-filters">
          {FILTER_PILL_BTNS_DUMMY.map((pill_btn) => (
            <a
              onClick={(e) => {
                e.preventDefault();
                console.log(`Applied filter: ${pill_btn}`);
              }}
              className="pill-btn"
              key={pill_btn}
            >
              {pill_btn}
            </a>
          ))}
        </div>
        <a
          className="pill-btn sort-btn"
          href="#"
          alt="sort results"
          onClick={(e) => {
            e.preventDefault();
            console.log("Sort menu opened");
          }}
        >
          Sort <Image src={SORT_DOWN_ARROW} alt="sort results" />
        </a>
      </div>
    </div>
  );
}
