import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SEARCH_BTN from "../../assets/search-bar/search-icon.svg";
import RIGHT_ARROW from "../../assets/icons/arrow-right-90-deg-white.svg";
import FilterBtn from "../FilterBtn/FilterBtn";

// TODO: Create queries that query the items for each filter dropdown

const FILTER_PILL_BTNS_DEFAULT = [
  {
    filterText: "Year",
    dropdownItems: [
      // { title: "2020", count: 15 },
    ],
  },
  {
    filterText: "People",
    dropdownItems: [
      // {
      //   title: "A-H",
      //   count: 5,
      //   childrenItems: ["PersonA", "PersonB", "PersonC"],
      // },
      // { title: "I-P", count: 7, childrenItems: ["Person2"] },
      // { title: "Q-Z", count: 3, childrenItems: ["Person3"] },
    ],
  },
  {
    filterText: "Role",
    dropdownItems: [
      // { title: "Artist", count: 4 },
    ],
  },
  {
    filterText: "Document Type",
    dropdownItems: [
      // { title: "Photo", count: 12 },
    ],
  },
  {
    filterText: "Project Type",
    dropdownItems: [
      // { title: "Research", count: 8 },
    ],
  },
  {
    filterText: "Location",
    dropdownItems: [
      // { title: "New York", count: 6 },
    ],
  },
];

export default function SearchBar({
  searchKeyword,
  setSearchKeyword,
  debouncedKeyword,
  isFrontPage,
  setResults,
  results,
}) {
  const router = useRouter();
  const { keyword } = router.query;

  // Local state for the input field
  const [localKeyword, setLocalKeyword] = useState(debouncedKeyword || "");

  const [selectedItems, setSelectedItems] = useState({}); // Stores selected parent-child hierarchy
  const [activeItems, setActiveItems] = useState([]);

  const clearFilters = () => {
    setSelectedItems({});
    setActiveItems([]);
  };

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

  const applyFilters = () => {
    // store results in a new array??
    // filter the array based on activeItems
    // show results (need to trigger the replacement of database results with filtered results -- user won't see this happen)
    // apply filters to url query params to make the link shareable
    console.log("Filters applied");
  };

  const removeItem = (itemToRemove) => {
    setActiveItems((prevActiveItems) =>
      prevActiveItems.filter((item) => item !== itemToRemove)
    );

    setSelectedItems((prevSelectedItems) => {
      const updatedItems = { ...prevSelectedItems };
      delete updatedItems[itemToRemove]; // Remove the key from selectedItems
      return updatedItems;
    });
  };

  useEffect(() => {
    setActiveItems([...Object.keys(selectedItems)]);
  }, [selectedItems]);

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
      <div className="active-filters">
        {activeItems?.length > 0 ? (
          activeItems.map((item, index) => {
            return (
              <div key={index} className="active-item">
                {item}{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    removeItem(item);
                  }}
                >
                  X
                </a>
              </div>
            );
          })
        ) : (
          <div className="active-item blank">
            <span></span>
          </div>
        )}
      </div>
      <div className="filter-pills">
        <div className="main-filters">
          {FILTER_PILL_BTNS_DEFAULT.map((filter) => (
            <FilterBtn
              filterText={filter.filterText}
              dropdownItems={filter.dropdownItems}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              activeItems={activeItems}
              setActiveItems={setActiveItems}
            />
          ))}
        </div>
        <div className="apply-and-clear-all-btn">
          <a href="#" onClick={clearFilters} className="clear-all-btn">
            Clear all
          </a>
          <a
            className="pill-btn apply-btn"
            href="#"
            alt="sort results"
            onClick={(e) => {
              applyFilters();
            }}
          >
            Apply{" "}
            <Image
              src={RIGHT_ARROW}
              alt="sort results"
              height={15}
              width={15}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
