import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import SEARCH_BTN from "../../assets/search-bar/search-icon.svg";
import RIGHT_ARROW from "../../assets/icons/arrow-right-90-deg-white.svg";
import FilterBtn from "../FilterBtn/FilterBtn";

const FILTER_PILL_BTNS_DEFAULT = [
  { filterText: "Year", dropdownItems: [] },
  { filterText: "People", dropdownItems: [] },
  { filterText: "Role", dropdownItems: [] },
  { filterText: "Document Type", dropdownItems: [] },
  { filterText: "Project Type", dropdownItems: [] },
  { filterText: "Location", dropdownItems: [] },
];

export default function SearchBar({
  searchKeyword,
  setSearchKeyword,
  debouncedKeyword,
  isFrontPage,
  setResults,
  results,
  allLoaded,
}) {
  const router = useRouter();
  const { keyword } = router.query;

  const [localKeyword, setLocalKeyword] = useState(debouncedKeyword || "");
  const [filterButtons, setFilterButtons] = useState(
    JSON.parse(JSON.stringify(FILTER_PILL_BTNS_DEFAULT))
  );
  const [selectedItems, setSelectedItems] = useState({});
  const [activeItems, setActiveItems] = useState([]);

  const getDropdownItems = (resultsArr) => {
    const updatedFilters = JSON.parse(JSON.stringify(FILTER_PILL_BTNS_DEFAULT));

    const yearFilter = updatedFilters.find((f) => f.filterText === "Year");
    const peopleFilter = updatedFilters.find((f) => f.filterText === "People");
    const roleFilter = updatedFilters.find((f) => f.filterText === "Role");
    const documentTypeFilter = updatedFilters.find(
      (f) => f.filterText === "Document Type"
    );
    const projectTypeFilter = updatedFilters.find(
      (f) => f.filterText === "Project Type"
    );
    const locationFilter = updatedFilters.find(
      (f) => f.filterText === "Location"
    );

    resultsArr?.forEach((result) => {
      if (result.__typename === "Asset_post") {
        const card = result.assetCard.assetCard?.[0];

        if (yearFilter && card?.startDate) {
          yearFilter.dropdownItems.push(new Date(card.startDate).getFullYear());
        }

        const peopleEdges = card?.artists?.[0]?.collaborator?.edges;
        peopleEdges?.forEach((person) => {
          peopleFilter?.dropdownItems.push(person.node.title);

          const roles =
            person.node.personCard?.personInfo?.[0]?.roleType?.edges;
          roles?.forEach((role) => {
            roleFilter?.dropdownItems.push(role.node.title);
          });
        });

        const types = card?.type?.[0]?.type?.edges;
        types?.forEach((type) => {
          projectTypeFilter?.dropdownItems.push(type.node.title);
          documentTypeFilter?.dropdownItems.push(type.node.title);
        });

        if (card?.location) {
          locationFilter?.dropdownItems.push(card.location);
        }
      }

      if (result.__typename === "RootQueryToPersonConnectionEdge") {
        peopleFilter?.dropdownItems.push(result.node.title);
        const location = result.node.personCard?.personInfo?.[0]?.location;
        if (location) locationFilter?.dropdownItems.push(location);
      }

      if (result.__typename === "RootQueryToPublicProgramConnectionEdge") {
        const events = result.node.programCard.programCard?.[0]?.eventType;
        projectTypeFilter?.dropdownItems.push(...events);
      }

      if (result.__typename === "RootQueryToStoryBlogPostConnectionEdge") {
        if (yearFilter && result.node.date) {
          yearFilter.dropdownItems.push(
            new Date(result.node.date).getFullYear()
          );
        }

        if (peopleFilter && result.node.storyBlocks?.mainContent?.[0]?.author) {
          peopleFilter.dropdownItems.push(
            result.node.storyBlocks.mainContent[0].author
          );
        }

        roleFilter?.dropdownItems.push("Author");
      }
    });

    updatedFilters.forEach((f) => {
      f.dropdownItems = [...new Set(f.dropdownItems.filter(Boolean))];
    });

    setFilterButtons(updatedFilters);
  };

  const applyFilters = () => {
    console.log("Filters applied");
  };

  const clearFilters = () => {
    setSelectedItems({});
    setActiveItems([]);
  };

  useEffect(() => {
    if (keyword !== undefined && keyword !== localKeyword) {
      setLocalKeyword(keyword);
    }
  }, [keyword]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localKeyword !== searchKeyword) {
        setSearchKeyword(localKeyword);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localKeyword, searchKeyword, setSearchKeyword]);

  const handleSearch = (e) => {
    setLocalKeyword(e.target.value);
  };

  const performSearch = useCallback(() => {
    if (!localKeyword.trim()) return;

    if (results?.length > 0) {
      setResults([]);
    }

    setFilterButtons(JSON.parse(JSON.stringify(FILTER_PILL_BTNS_DEFAULT)));

    router.replace(
      {
        pathname: "/search",
        query: { keyword: localKeyword },
      },
      undefined,
      { shallow: true }
    );
  }, [localKeyword, results, router, setResults]);

  const removeItem = (itemToRemove) => {
    setActiveItems((prev) => prev.filter((item) => item !== itemToRemove));
    setSelectedItems((prev) => {
      const updated = { ...prev };
      delete updated[itemToRemove];
      return updated;
    });
  };

  useEffect(() => {
    setActiveItems([...Object.keys(selectedItems)]);
  }, [selectedItems]);

  useEffect(() => {
    if (results?.length <= 0) return;
    getDropdownItems(results);
  }, [results, allLoaded]);

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
            placeholder=""
            onChange={handleSearch}
            value={localKeyword}
            name="searchKeyword"
          />
          {localKeyword !== "" && debouncedKeyword !== "" && isFrontPage ? (
            <button type="submit" className="search-btn">
              <Image src={SEARCH_BTN} alt="search the archive" />
            </button>
          ) : (
            <a href="/search" className="search-btn">
              <Image src={SEARCH_BTN} alt="search the archive" />
            </a>
          )}
        </form>
      </div>

      <div className="active-filters">
        {activeItems.length > 0 ? (
          activeItems.map((item, index) => (
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
          ))
        ) : (
          <div className="active-item blank">
            <span></span>
          </div>
        )}
      </div>

      <div className="filter-pills">
        <div className="main-filters">
          {filterButtons.map((filter) => (
            <FilterBtn
              key={filter.filterText}
              filter={filter}
              filterText={filter.filterText}
              dropdownItems={filter.dropdownItems}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              activeItems={activeItems}
              setActiveItems={setActiveItems}
              resultsArr={results}
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
            alt="apply filters"
            onClick={applyFilters}
          >
            Apply{" "}
            <Image
              src={RIGHT_ARROW}
              alt="apply filters"
              height={15}
              width={15}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
