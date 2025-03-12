import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SEARCH_BTN from "../../assets/search-bar/search-icon.svg";
import SORT_DOWN_ARROW from "../../assets/search-bar/sort-down-arrow.svg";

const FILTER_PILL_BTNS_DUMMY = [
  "Year",
  "People",
  "Role",
  "Document Type",
  "Project Type",
  "Location",
];

export default function SearchBar({
  searchKeyword,
  setSearchKeyword,
  isFrontPage,
  setResults,
  results,
}) {
  const router = useRouter();
  const { keyword } = router.query;

  // Local state for the input field
  const [localKeyword, setLocalKeyword] = useState(searchKeyword || "");

  // Sync input with URL when `keyword` in query updates
  useEffect(() => {
    if (keyword !== undefined && keyword !== localKeyword) {
      setLocalKeyword(keyword);
    }
  }, [keyword]);

  // Debounce effect to reduce unnecessary updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localKeyword !== searchKeyword) {
        setSearchKeyword(localKeyword);
      }
    }, 300); // Adjust debounce delay as needed

    return () => clearTimeout(timer);
  }, [localKeyword, searchKeyword, setSearchKeyword]);

  const handleSearch = (e) => {
    setLocalKeyword(e.target.value);
  };

  const performSearch = useCallback(() => {
    if (!localKeyword.trim()) return;

    // Update results state
    if (results?.length > 0) {
      setResults([]);
    }

    // Update the URL without causing a full-page reload
    router.replace(
      {
        pathname: "/search",
        query: { keyword: localKeyword },
      },
      undefined,
      { shallow: true }
    );
  }, [localKeyword, results, router, setResults]);

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
            onChange={handleSearch}
            value={localKeyword}
            name="searchKeyword"
          />
          <button type="submit" className="search-btn">
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
