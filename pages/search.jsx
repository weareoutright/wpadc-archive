// --- search.jsx ---
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  useAssets,
  usePeople,
  useGeneralSettings,
  useHeaderMenu,
  useStoryBlogs,
} from "../constants/customQueryHooks";
import { gql } from "@apollo/client";
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

export default function Component() {
  const [isNavShown, setIsNavShown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { query } = router;

  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [unfilteredResults, setUnfilteredResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  const applyPageChange = (pageNum, e) => {
    e.preventDefault();
    setCurrentPage(pageNum);
  };

  const divideAndCreatePaginationArray = (num) => {
    const pages = Math.ceil(num / 16);
    return Array.from({ length: pages }, (_, i) => i + 1);
  };

  const { loading: loadingSettings, generalSettings } = useGeneralSettings();
  const { loading: loadingMenus, menus } = useHeaderMenu();
  const { loading: assetsLoading, assetPosts: assetSearch } = useAssets(
    searchKeyword || "_none_"
  );
  const { loading: peopleLoading, people: peopleSearch } = usePeople(
    searchKeyword || "_none_"
  );
  const { loading: loadingPublicPrograms, publicPrograms } =
    usePublicProgramsKeywordSearch(searchKeyword || "_none_");
  const { loading: loadingStoryBlogs, storyBlogs } = useStoryBlogs(
    searchKeyword || "_none_"
  );

  const {
    loading: loadingData,
    error,
    refetch,
  } = useQuery(Component.query, {
    variables: Component.variables({
      searchKeyword: debouncedKeyword || "_none_",
    }),
    notifyOnNetworkStatusChange: true,
    skip: debouncedKeyword.trim().length < 1,
  });

  const allLoaded =
    !assetsLoading &&
    !peopleLoading &&
    !loadingPublicPrograms &&
    !loadingStoryBlogs;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKeyword?.trim() !== debouncedKeyword) {
        setDebouncedKeyword(searchKeyword);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchKeyword]);

  useEffect(() => {
    if (debouncedKeyword.trim().length > 0) {
      refetch();
    }
  }, [debouncedKeyword, refetch]);

  useEffect(() => {
    if (allLoaded) {
      const combined = [
        ...assetSearch,
        ...peopleSearch,
        ...publicPrograms,
        ...storyBlogs,
      ];
      setUnfilteredResults(combined);
      setResults(combined);
    }
  }, [allLoaded, assetSearch, peopleSearch, publicPrograms, storyBlogs]);

  useEffect(() => {
    if (typeof query.keyword === "string" && query.keyword.trim() !== "") {
      setSearchKeyword(query.keyword);
    }
    if (query.filters) {
      try {
        const parsed = JSON.parse(query.filters);
        setSelectedItems(parsed);
      } catch (e) {
        console.error("Invalid filters in URL", e);
      }
    }
  }, [query.keyword, query.filters]);

  if (loadingSettings || loadingMenus) return <LoadingPage stroke="#808080" />;

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
        currentRoute={"/search"}
        isNavShown={isNavShown}
        setIsNavShown={setIsNavShown}
      />
      {!isNavShown && (
        <>
          <SearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            debouncedKeyword={debouncedKeyword}
            setResults={setResults}
            results={results}
            allLoaded={allLoaded}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            unfilteredResults={unfilteredResults}
          />
          <Main>
            <Container>
              <div className="Search">
                <div className="results">
                  <h1>
                    {!allLoaded && "Searching for "}
                    {allLoaded && "Results for "}"{searchKeyword}"{" "}
                    <small>{results.length} result(s)</small>
                  </h1>
                  {!allLoaded && (
                    <div className="search-result-loading-icon">
                      <LoadingIcons.Grid stroke="#808080" fill="#808080" />
                    </div>
                  )}
                  {allLoaded && results.length <= 0 && (
                    <div>No results for "{searchKeyword}"</div>
                  )}
                  {results.length > 0 && (
                    <div className="results-container">
                      {results.map((result, index) => {
                        const key = `${
                          result.__typename || result.node?.__typename
                        }-${index}`;
                        const node = result.node || result;

                        if (node.__typename === "Asset_post")
                          return (
                            <AssetSearchResultCard key={key} node={node} />
                          );
                        if (node.__typename === "Person")
                          return (
                            <PersonSearchResultCard key={key} node={node} />
                          );
                        if (node.__typename === "PublicProgram")
                          return (
                            <AssetSearchResultCard
                              key={key}
                              node={node}
                              isPublicProgram
                            />
                          );
                        if (node.__typename === "StoryBlogPost")
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
                  {divideAndCreatePaginationArray(results.length).map(
                    (pageNum) => (
                      <a
                        key={`page-${pageNum}`}
                        href="#"
                        className={`page-number-btn ${
                          currentPage === pageNum ? "current-page" : ""
                        }`}
                        onClick={(e) => applyPageChange(pageNum, e)}
                      >
                        {pageNum}
                      </a>
                    )
                  )}
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
