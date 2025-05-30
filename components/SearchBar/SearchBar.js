import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
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

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const shouldSyncWithParent =
    hasMounted && router.asPath.startsWith("/search");

  // Only sync local keyword back to parent on /search
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
    if (!hasMounted) return;
    if (!router.asPath.startsWith("/search")) return;
    if (!selectedItems || typeof selectedItems !== "object") return;

    const newQuery = {
      ...router.query,
      filters:
        Object.keys(selectedItems).length > 0
          ? JSON.stringify(selectedItems)
          : undefined,
    };

    router.replace(
      {
        pathname: "/search",
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );
  }, [selectedItems, hasMounted, router.asPath]);

  useEffect(() => {
    if (results?.length <= 0) return;
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

    results?.forEach((result) => {
      const node = result.node || result;

      if (node.__typename === "Asset_post") {
        const card = node.assetCard?.assetCard?.[0];
        if (card?.startDate)
          yearFilter.dropdownItems.push(new Date(card.startDate).getFullYear());

        const people = card?.artists?.[0]?.collaborator?.edges;
        people?.forEach((p) => {
          peopleFilter.dropdownItems.push(p.node.title);
          const roles = p.node.personCard?.personInfo?.[0]?.roleType?.edges;
          roles?.forEach((r) => roleFilter.dropdownItems.push(r.node.title));
        });

        const types = card?.type?.[0]?.type?.edges;
        types?.forEach((t) => {
          documentTypeFilter.dropdownItems.push(t.node.title);
          projectTypeFilter.dropdownItems.push(t.node.title);
        });

        if (card?.location) locationFilter.dropdownItems.push(card.location);
      }

      if (node.__typename === "Person") {
        peopleFilter.dropdownItems.push(node.title);
        const loc = node.personCard?.personInfo?.[0]?.location;
        if (loc) locationFilter.dropdownItems.push(loc);
      }

      if (node.__typename === "PublicProgram") {
        const events = node.programCard?.programCard?.[0]?.eventType;
        projectTypeFilter.dropdownItems.push(...(events || []));
      }

      if (node.__typename === "StoryBlogPost") {
        if (node.date)
          yearFilter.dropdownItems.push(new Date(node.date).getFullYear());
        const author = node.storyBlocks?.mainContent?.[0]?.author;
        if (author) peopleFilter.dropdownItems.push(author);
        roleFilter.dropdownItems.push("Author");
      }
    });

    updatedFilters.forEach((f) => {
      f.dropdownItems = [...new Set(f.dropdownItems.filter(Boolean))];
    });

    setFilterButtons(updatedFilters);
  }, [results]);

  useEffect(() => {
    const newKeys = Object.keys(selectedItems || {});
    const areSame =
      newKeys.length === activeItems.length &&
      newKeys.every((k) => activeItems.includes(k));

    if (!areSame) {
      setActiveItems(newKeys);
    }
  }, [selectedItems, activeItems]);

  useEffect(() => {
    if (!unfilteredResults?.length) return;
    let filtered = [...unfilteredResults];

    Object.entries(selectedItems).forEach(([key, values]) => {
      filtered = filtered.filter((item) => {
        const node = item.node || item;

        if (key === "Year") {
          const year = node?.assetCard?.assetCard?.[0]?.startDate
            ? new Date(node.assetCard.assetCard[0].startDate).getFullYear()
            : null;
          return values.includes(year);
        }

        if (key === "People") {
          const people =
            node?.assetCard?.assetCard?.[0]?.artists?.[0]?.collaborator?.edges?.map(
              (e) => e.node.title
            ) || [];
          return people.some((p) => values.includes(p));
        }

        if (key === "Location") {
          const loc =
            node?.assetCard?.assetCard?.[0]?.location ||
            node?.personCard?.personInfo?.[0]?.location;
          return values.includes(loc);
        }

        return true;
      });
    });

    setResults(filtered);
  }, [selectedItems, unfilteredResults]);

  const clearFilters = () => {
    setSelectedItems({});
    setActiveItems([]);
  };

  const performSearch = useCallback(() => {
    if (!localKeyword.trim()) return;

    if (setResults) {
      setResults([]);
    }

    setFilterButtons(JSON.parse(JSON.stringify(FILTER_PILL_BTNS_DEFAULT)));

    router.push({
      pathname: "/search",
      query: { keyword: localKeyword },
    });
  }, [localKeyword, setResults]);

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
