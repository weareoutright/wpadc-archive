import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import SEARCH_BTN from "../../assets/search-bar/search-icon.svg";
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
  setResults,
  results,
  allLoaded,
  selectedItems = {},
  setSelectedItems,
  unfilteredResults,
  isFrontPage,
  filterCounts = {},
  setFilterCounts, // 🆕 make sure you pass this prop from the parent!
}) {
  const router = useRouter();
  const { keyword } = router.query;

  const [localKeyword, setLocalKeyword] = useState(() => {
    return searchKeyword || (typeof keyword === "string" ? keyword : "");
  });

  const [filterButtons, setFilterButtons] = useState(
    JSON.parse(JSON.stringify(FILTER_PILL_BTNS_DEFAULT))
  );
  const [activeItems, setActiveItems] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  const shouldSyncWithParent =
    hasMounted && router.asPath.startsWith("/search");

  useEffect(() => {
    if (!shouldSyncWithParent) return;

    if (localKeyword.trim() !== searchKeyword?.trim()) {
      const timer = setTimeout(() => {
        setSearchKeyword(localKeyword);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [localKeyword, searchKeyword, shouldSyncWithParent]);

  useEffect(() => {
    if (!hasMounted || !router.asPath.startsWith("/search")) return;

    const newQuery = {
      ...router.query,
      filters:
        Object.keys(selectedItems).length > 0
          ? JSON.stringify(selectedItems)
          : undefined,
    };

    router.replace({ pathname: "/search", query: newQuery }, undefined, {
      shallow: true,
    });
  }, [selectedItems, hasMounted, router.asPath]);

  useEffect(() => {
    if (!results?.length) return;

    const updatedFilters = JSON.parse(JSON.stringify(FILTER_PILL_BTNS_DEFAULT));
    const counts = {};

    updatedFilters.forEach((filter) => {
      counts[filter.filterText] = {};
    });

    results.forEach((result) => {
      const node = result?.node || result;

      updatedFilters.forEach((filter) => {
        const key = filter.filterText;
        let values = [];

        switch (key) {
          case "Year":
            const rawDate =
              node?.assetCard?.assetCard?.[0]?.startDate || node?.date;
            const year = rawDate
              ? String(new Date(rawDate).getFullYear())
              : null;
            if (year) values.push(year);
            break;

          case "People":
            if (node?.__typename === "Asset_post") {
              const people =
                node?.assetCard?.assetCard?.[0]?.artists?.[0]?.collaborator
                  ?.edges || [];
              values.push(...people.map((p) => p?.node?.title).filter(Boolean));
            } else if (node?.__typename === "Person") {
              values.push(node?.title);
            } else if (node?.__typename === "StoryBlogPost") {
              const author = node?.storyBlocks?.mainContent?.[0]?.author;
              if (author) values.push(author);
            }
            break;

          case "Location":
            const loc =
              node?.assetCard?.assetCard?.[0]?.location ||
              node?.personCard?.personInfo?.[0]?.location;
            if (loc) values.push(loc);
            break;

          case "Role":
            const roles =
              node?.assetCard?.assetCard?.[0]?.artists?.[0]?.collaborator
                ?.edges || [];

            roles.forEach((edge) => {
              const nestedRoles =
                edge?.node?.personCard?.personInfo?.[0]?.roleType?.edges || [];
              nestedRoles.forEach((r) => {
                if (r?.node?.title) values.push(r.node.title);
              });
            });

            if (node?.__typename === "StoryBlogPost") values.push("Author");
            break;

          case "Document Type":
          case "Project Type":
            const types =
              node?.assetCard?.assetCard?.[0]?.type?.[0]?.type?.edges || [];
            values.push(...types.map((e) => e?.node?.title).filter(Boolean));

            if (
              node?.__typename === "PublicProgram" &&
              key === "Project Type"
            ) {
              const events =
                node?.programCard?.programCard?.[0]?.eventType || [];
              values.push(...events.filter(Boolean));
            }
            break;

          default:
            break;
        }

        values.filter(Boolean).forEach((val) => {
          filter.dropdownItems.push(val);
          counts[key][val] = (counts[key][val] || 0) + 1;
        });
      });
    });

    updatedFilters.forEach((f) => {
      f.dropdownItems = [...new Set(f.dropdownItems.filter(Boolean))];
    });

    setFilterButtons(updatedFilters);
    setFilterCounts(counts); // ✅ THIS LINE FIXES THE ISSUE
  }, [results]);

  useEffect(() => {
    const newKeys = Object.keys(selectedItems || {});
    const areSame =
      newKeys.length === activeItems.length &&
      newKeys.every((k) => activeItems.includes(k));

    if (!areSame) setActiveItems(newKeys);
  }, [selectedItems, activeItems]);

  const clearFilters = () => {
    setSelectedItems({});
    setActiveItems([]);
  };

  const performSearch = () => {
    let keywordParam = localKeyword.trim();
    if (!keywordParam && router.pathname === "/") keywordParam = "art";
    if (!keywordParam) return;

    setResults([]);
    setFilterButtons(JSON.parse(JSON.stringify(FILTER_PILL_BTNS_DEFAULT)));

    router.push({
      pathname: "/search",
      query: { keyword: keywordParam },
    });
  };

  const handleSearch = (e) => setLocalKeyword(e.target.value);

  const removeItem = (itemToRemove) => {
    setActiveItems((prev) => prev.filter((item) => item !== itemToRemove));
    setSelectedItems((prev) => {
      const updated = { ...prev };
      delete updated[itemToRemove];
      return updated;
    });
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
            placeholder=""
            value={localKeyword}
            onChange={handleSearch}
            name="searchKeyword"
          />
          <button type="submit" className="search-btn">
            <Image src={SEARCH_BTN} alt="search the archive" />
          </button>
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
              filterCountArr={filterCounts[filter.filterText] || {}}
            />
          ))}
        </div>
        <div className="apply-and-clear-all-btn">
          <a href="#" onClick={clearFilters} className="clear-all-btn">
            Clear all
          </a>
        </div>
      </div>
    </div>
  );
}
