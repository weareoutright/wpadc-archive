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
  const [debouncedKeyword, setDebouncedKeyword] = useState(searchKeyword);
  const [results, setResults] = useState([]);

  const applyPageChange = (pageNum, e) => {
    e.preventDefault();
    setCurrentPage(pageNum);
    // TODO: add query param updates if needed
  };

  const divideAndCreatePaginationArray = (num) => {
    const pages = Math.ceil(num / 16);
    return Array.from({ length: pages }, (_, i) => i + 1);
  };

  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();

  const {
    loading: assetsLoading,
    error: assetsError,
    assetPosts: assetSearch,
  } = useAssets(searchKeyword || "_none_");

  const {
    loading: peopleLoading,
    error: peopleError,
    people: peopleSearch,
  } = usePeople(searchKeyword || "_none_");

  const {
    loading: loadingPublicPrograms,
    error: errorPublicPrograms,
    publicPrograms,
  } = usePublicProgramsKeywordSearch(searchKeyword || "_none_");

  const {
    loading: loadingStoryBlogs,
    error: errorStoryBlogs,
    storyBlogs,
  } = useStoryBlogs(searchKeyword || "_none_");

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

  const primaryMenu = menus;

  // Update debouncedKeyword after 300ms delay
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchKeyword?.trim() !== debouncedKeyword) {
        setDebouncedKeyword(searchKeyword);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [searchKeyword]);

  // Refetch on debounced keyword change
  useEffect(() => {
    if (debouncedKeyword.trim().length > 0) {
      refetch();
    }
  }, [debouncedKeyword, refetch]);

  // Populate results once all are loaded
  useEffect(() => {
    if (allLoaded) {
      setResults([
        ...assetSearch,
        ...peopleSearch,
        ...publicPrograms,
        ...storyBlogs,
      ]);
    }
  }, [allLoaded, assetSearch, peopleSearch, publicPrograms, storyBlogs]);

  // Sync keyword from router query
  useEffect(() => {
    if (query.keyword && query.keyword !== searchKeyword) {
      setSearchKeyword(query.keyword);
    }
  }, [query.keyword]);

  if (loadingSettings || loadingMenus || loadingData) return null;
  if (errorSettings || errorMenus || error) {
    console.error("Settings ERROR:", errorSettings?.message);
    console.error("Menus ERROR:", errorMenus?.message);
    console.error("Data ERROR:", error?.message);
  }

  return (
    <>
      <SEO
        title={generalSettings.title}
        description={generalSettings.description}
      />
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
        menuItems={primaryMenu}
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
          />
          <Main>
            <Container>
              <div className="Search">
                <div className="results">
                  <h1>
                    {!allLoaded && "Searching for "}
                    {allLoaded && "Results for "}"{searchKeyword || ""}"{" "}
                    <small>
                      {results.length}{" "}
                      {results.length === 1 ? "result" : "results"}
                    </small>
                  </h1>

                  {results.length <= 0 && searchKeyword === "" && (
                    <div className="results-container-placeholder"> </div>
                  )}
                  {!allLoaded && (
                    <div className="search-result-loading-icon">
                      <LoadingIcons.Grid
                        stroke="#808080"
                        strokeOpacity={1}
                        fill="#808080"
                        fillOpacity={1}
                      />
                    </div>
                  )}
                  {allLoaded && results.length <= 0 && (
                    <div>No results for "{searchKeyword}"</div>
                  )}
                  {results.length > 0 && searchKeyword !== "" && (
                    <div className="results-container">
                      {results.map((result, index) => {
                        if (
                          result.__typename === "Asset_post" ||
                          result.__typename ===
                            "RootQueryToAsset_postConnection"
                        ) {
                          return (
                            <AssetSearchResultCard
                              key={`asset-card-${index}`}
                              node={result}
                            />
                          );
                        }
                        if (
                          result.__typename === "Person" ||
                          result.__typename ===
                            "RootQueryToPersonConnectionEdge"
                        ) {
                          return (
                            <PersonSearchResultCard
                              key={`person-card-${index}`}
                              node={result}
                            />
                          );
                        }
                        if (
                          result.node?.__typename === "PublicProgram" ||
                          result.__typename ===
                            "RootQueryToPublicProgramConnectionEdge"
                        ) {
                          return (
                            <AssetSearchResultCard
                              key={`public-program-card-${index}`}
                              node={result}
                              isPublicProgram
                            />
                          );
                        }
                        if (
                          result.node?.__typename === "StoryBlogPost" ||
                          result.__typename ===
                            "RootQueryToStoryBlogPostConnectionEdge"
                        ) {
                          return (
                            <AssetSearchResultCard
                              key={`story-blog-card-${index}`}
                              node={result}
                              isWPAStory
                            />
                          );
                        }
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
