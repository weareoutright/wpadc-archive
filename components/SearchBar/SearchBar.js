import { useRouter } from "next/router"; // Import the useRouter hook
import { useEffect, useState } from "react";
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
  isFrontPage,
}) {
  const router = useRouter(); // Initialize the router
  const [frontPageSearchKeyword, setFrontPageSearchKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (isFrontPage) {
      setFrontPageSearchKeyword(e.target.value);
    } else {
      setSearchKeyword(e.target.value);
    }
  };

  const openSortMenu = (e) => {
    e.preventDefault();
    console.log("open sort menu");
  };

  const applyFilter = (e, filter) => {
    e.preventDefault();
    console.log(filter);
  };

  const performSearch = () => {
    if (isFrontPage && frontPageSearchKeyword) {
      router.push(
        `/search?keyword=${encodeURIComponent(frontPageSearchKeyword)}`
      ); // Navigate to the search page with query
    }
  };

  useEffect(() => {
    console.log(frontPageSearchKeyword);
  }, [frontPageSearchKeyword]);

  return (
    <div className={`search-bar ${isFrontPage ? "front-page-search-bar" : ""}`}>
      <div
        className={`search-and-icon ${
          isFrontPage ? "front-page-search-and-icon" : ""
        }`}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Exhibits in the 1980s..."
            onChange={(e) => handleSearch(e)}
            value={searchKeyword}
            name="searchKeyword"
          />
          <button
            className="search-btn"
            href="#"
            onClick={() => performSearch()}
            type="submit"
          >
            <Image src={SEARCH_BTN} alt="search the archive" />
          </button>
        </form>
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
