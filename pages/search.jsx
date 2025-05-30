import React, { useState, useEffect, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  useAssets,
  usePeople,
  useGeneralSettings,
  useHeaderMenu,
  useStoryBlogs,
} from "../constants/customQueryHooks";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import {
  Header,
  Footer,
  Main,
  Container,
  SEO,
  NavigationMenu,
  SearchBar,
  LoadingPage,
} from "../components";
import { AssetSearchResultCard } from "../components/AssetSearchResultCard";
import { PersonSearchResultCard } from "../components";
import PREV_BTN_DARK from "../assets/icons/previous-btn-dark.svg";
import NEXT_BTN from "../assets/icons/next-btn.svg";
import usePublicProgramsKeywordSearch from "../constants/customQueryHooks/usePublicPrograms";
import LoadingIcons from "react-loading-icons";

// filter keys
const FILTER_KEYS = [
  "Year",
  "People",
  "Location",
  "Role",
  "Document Type",
  "Project Type",
];

// Extract values for each filter key
function getFilterValues(node, key) {
  switch (key) {
    case "Year": {
      const start = node?.assetCard?.assetCard?.[0]?.startDate;
      return start ? [String(new Date(start).getFullYear())] : [];
    }
    case "People":
      return (
        node?.assetCard?.assetCard?.[0]?.artists?.[0]?.collaborator?.edges?.map(
          (e) => String(e.node.title)
        ) || []
      );
    case "Location": {
      const loc =
        node?.assetCard?.assetCard?.[0]?.location ||
        node?.personCard?.personInfo?.[0]?.location;
      return loc ? [String(loc)] : [];
    }
    case "Role":
      return (
        node?.assetCard?.assetCard?.[0]?.artists?.[0]?.collaborator?.edges?.flatMap(
          (e) =>
            (e.node?.personCard?.personInfo?.[0]?.roleType?.edges || []).map(
              (r) => String(r.node.title)
            )
        ) || []
      );
    case "Document Type":
    case "Project Type":
      return (
        node?.assetCard?.assetCard?.[0]?.type?.[0]?.type?.edges?.map((e) =>
          String(e.node.title)
        ) || []
      );
    default:
      return [];
  }
}

function applyFilters(resultsArray, selectedItems) {
  resultsArray.forEach((item) => {
    if (item.__typename === "RootQueryToPersonConnectionEdge") {
      item.filterProps.People.push(item.node.title);
    }
  });

  console.log(resultsArray);

  if (!selectedItems || Object.keys(selectedItems).length <= 0) {
    return resultsArray;
  }

  const selectedValues = Object.keys(selectedItems).flat();

  resultsArray.filter((item) => {
    const allProps = Object.values(item.filterProps).flat();
    return selectedValues.some((v) => allProps.includes(v));
  });

  return resultsArray.filter((item) => {
    const allProps = Object.values(item.filterProps).flat();
    return selectedValues.some((v) => allProps.includes(v));
  });
}

export default function Component() {
  const [isNavShown, setIsNavShown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { query } = router;

  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [unfilteredResults, setUnfilteredResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  const { loading: ls, generalSettings } = useGeneralSettings();
  const { loading: lm, menus } = useHeaderMenu();
  const { loading: la, assetPosts } = useAssets(searchKeyword || "_none_");
  const { loading: lp, people } = usePeople(searchKeyword || "_none_");
  const { loading: lpp, publicPrograms } = usePublicProgramsKeywordSearch(
    searchKeyword || "_none_"
  );
  const { loading: lb, storyBlogs } = useStoryBlogs(searchKeyword || "_none_");

  const allLoaded = !la && !lp && !lpp && !lb;

  // Debounce input
  useEffect(() => {
    const id = setTimeout(() => {
      if (searchKeyword.trim() !== debouncedKeyword) {
        setDebouncedKeyword(searchKeyword);
      }
    }, 300);
    return () => clearTimeout(id);
  }, [searchKeyword]);

  // Refetch GraphQL
  const { refetch } = useQuery(Component.query, {
    variables: Component.variables({
      searchKeyword: debouncedKeyword || "_none_",
    }),
    skip: debouncedKeyword.trim().length < 1,
  });
  useEffect(() => {
    if (debouncedKeyword.trim()) refetch();
  }, [debouncedKeyword, refetch]);

  // Combine raw results & annotate filterProps
  useEffect(() => {
    if (!allLoaded) return;
    const combined = [
      ...assetPosts,
      ...people,
      ...publicPrograms,
      ...storyBlogs,
    ].map((item) => {
      const node = item.node || item;
      const filterProps = FILTER_KEYS.reduce((acc, key) => {
        acc[key] = getFilterValues(node, key);

        return acc;
      }, {});

      return { ...item, filterProps };
    });
    setUnfilteredResults(combined);
  }, [allLoaded, assetPosts, people, publicPrograms, storyBlogs]);

  // Compute filtered results
  const filteredResults = useMemo(() => {
    if (!unfilteredResults.length) return [];
    return applyFilters(unfilteredResults, selectedItems);
  }, [unfilteredResults, selectedItems]);

  // Hydrate state from URL
  useEffect(() => {
    if (typeof query.keyword === "string" && query.keyword.trim()) {
      setSearchKeyword(query.keyword);
    }
    if (query.filters) {
      try {
        setSelectedItems(JSON.parse(query.filters));
      } catch {}
    }
  }, [query.keyword, query.filters]);

  if (ls || lm) return <LoadingPage stroke="#808080" />;

  return (
    <>
      <SEO
        title={generalSettings.title}
        description={generalSettings.description}
      />
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
        menuItems={menus}
        currentRoute="/search"
        isNavShown={isNavShown}
        setIsNavShown={setIsNavShown}
      />
      {!isNavShown && (
        <>
          <SearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            debouncedKeyword={debouncedKeyword}
            setResults={() => {}}
            results={unfilteredResults}
            allLoaded={allLoaded}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            unfilteredResults={unfilteredResults}
            isFrontPage={false}
          />
          <Main>
            <Container>
              <div className="Search">
                <div className="results">
                  <h1>
                    {!allLoaded ? (
                      <>Searching for "{searchKeyword}"</>
                    ) : (
                      <>
                        Results for "{searchKeyword}"{" "}
                        <small>{filteredResults.length} result(s)</small>
                      </>
                    )}
                  </h1>
                  {!allLoaded && (
                    <div className="search-result-loading-icon">
                      <LoadingIcons.Grid stroke="#808080" fill="#808080" />
                    </div>
                  )}
                  {allLoaded && filteredResults.length === 0 && (
                    <div>No results for "{searchKeyword}"</div>
                  )}
                  {filteredResults.length > 0 && (
                    <div className="results-container">
                      {filteredResults.map((res, i) => {
                        const node = res?.node || res;
                        const key = `${node?.__typename}-${i}`;
                        if (node?.__typename === "Asset_post")
                          return (
                            <AssetSearchResultCard key={key} node={node} />
                          );
                        if (node?.__typename === "Person")
                          return (
                            <PersonSearchResultCard key={key} node={node} />
                          );
                        if (node?.__typename === "PublicProgram")
                          return (
                            <AssetSearchResultCard
                              key={key}
                              node={node}
                              isPublicProgram
                            />
                          );
                        if (node?.__typename === "StoryBlogPost")
                          return (
                            <AssetSearchResultCard
                              key={key}
                              node={node}
                              isWPAStory
                            />
                          );
                        return null;
                      })}
                    </div>
                  )}
                  <hr />
                </div>
                <div className="pagination">
                  <a href="#" className="pagination-btn">
                    <Image src={PREV_BTN_DARK} alt="previous results" />
                  </a>
                  {Array.from(
                    { length: Math.ceil(filteredResults.length / 16) },
                    (_, i) => i + 1
                  ).map((pageNum) => (
                    <a
                      key={`page-${pageNum}`}
                      href="#"
                      className={`${
                        currentPage === pageNum ? "current-page" : ""
                      } page-number-btn`}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(pageNum);
                      }}
                    >
                      {pageNum}
                    </a>
                  ))}
                  <a href="#" className="pagination-btn">
                    <Image src={NEXT_BTN} alt="more results" />
                  </a>
                </div>
              </div>
            </Container>
          </Main>
          <Footer title={generalSettings.title} menuItems={null} />
        </>
      )}
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
Component.variables = () => ({
  headerLocation: MENUS.PRIMARY_LOCATION,
  footerLocation: MENUS.FOOTER_LOCATION,
});
