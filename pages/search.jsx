import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  useAssets,
  useGeneralSettings,
  useHeaderMenu,
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
} from "../components";
import { AssetSearchResultCard } from "../components/AssetSearchResultCard";
import { PersonSearchResultCard } from "../components";
import PREV_BTN_DARK from "../assets/icons/previous-btn-dark.svg";
import NEXT_BTN from "../assets/icons/next-btn.svg";

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

    // TODO: also need to add functionality for adding to query params
  };

  const divideAndCreatePaginationArray = (num) => {
    const quotient = Math.floor(num / 16);
    const hasRemainder = num % 16 !== 0;
    const length = quotient + (hasRemainder ? 1 : 0);
    return Array.from({ length }, (_, i) => i + 1);
  };

  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();

  const {
    loading: loadingData,
    error,
    data,
    refetch,
  } = useQuery(Component.query, {
    variables: Component.variables({
      searchKeyword: debouncedKeyword || "_none_",
    }),
    notifyOnNetworkStatusChange: true,
    skip: searchKeyword?.trim().length < 1,
  });

  let assetSearch = data?.assetSearch.nodes || [];
  let peopleSearch = data?.peopleSearch.edges || [];
  const primaryMenu = menus;

  useEffect(() => {
    if (searchKeyword?.trim() !== debouncedKeyword) {
      setDebouncedKeyword(searchKeyword);
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (data) {
      setResults([...assetSearch, ...peopleSearch]);
    }
  }, [data]);

  useEffect(() => {
    if (searchKeyword?.trim() !== "") {
      refetch();
    }
  }, [debouncedKeyword, refetch]);

  useEffect(() => {
    if (query.keyword && query.keyword !== searchKeyword) {
      setSearchKeyword(query.keyword);
    }
  }, [query.keyword]);

  if (loadingSettings || loadingMenus) return null;
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
          />
          <Main>
            <Container>
              <div className="Search">
                <div className="results">
                  <h1>
                    Results for "
                    {searchKeyword === undefined ? "" : searchKeyword}"{" "}
                    <small>
                      {results.length}{" "}
                      {results.length > 1 || results.length === 0
                        ? "results"
                        : "result"}
                    </small>
                  </h1>

                  {results.length <= 0 && searchKeyword === "" && (
                    <div className="results-container-placeholder"> </div>
                  )}
                  {loadingData ? <span>Loading search results...</span> : null}
                  {!loadingData &&
                    results?.length <= 0 &&
                    `No results for "${searchKeyword}"`}
                  {results.length > 0 && searchKeyword !== "" ? (
                    <div className="results-container">
                      {results?.map((result, index) => {
                        if (result.__typename === "Asset_post") {
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
                      })}
                    </div>
                  ) : null}
                  <hr />
                </div>
                <div className="pagination">
                  <a href="#" className="pagination-btn">
                    <Image src={PREV_BTN_DARK} alt="previous results" />
                  </a>
                  {divideAndCreatePaginationArray(results.length).map(
                    (pageNum) => {
                      return (
                        <a
                          key={`page-${pageNum}`}
                          href="#"
                          className={`page-number-btn ${
                            currentPage === pageNum && "current-page"
                          }`}
                          onClick={(e) => applyPageChange(pageNum, e)}
                        >
                          {pageNum}
                        </a>
                      );
                    }
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
    $searchKeyword: String = ""
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

    assetSearch: assetPosts(where: { search: $searchKeyword }) {
      nodes {
        id
        title
        uri
        slug
        assetCard {
          assetCard {
            ... on AssetCardAssetCardAssetCardLayout {
              description
              startDate
              endDate
              year
              location
              eyebrow {
                edges {
                  node {
                    id
                    link
                    slug
                  }
                }
              }
              artists {
                collaborator {
                  edges {
                    node {
                      id
                      slug
                      uri
                      ... on Person {
                        id
                        title
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    peopleSearch: people(where: { search: $searchKeyword }) {
      edges {
        node {
          title
          uri
          slug
          id
          personCard {
            personInfo {
              fieldGroupName
              ... on PersonCardPersonInfoPersonCardLayout {
                headshot {
                  node {
                    altText
                    caption
                    sourceUrl
                    title
                    description
                  }
                }
                roleType {
                  edges {
                    node {
                      ... on PersonRoleType {
                        id
                        title
                      }
                    }
                  }
                }
                activeSinceYear
                location
                bodyCopy
                quote
                quotee
                externalLinks {
                  url
                }
                related {
                  relatedCard {
                    nodes {
                      slug
                      id
                      uri
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

Component.variables = ({ searchKeyword }) => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    searchKeyword: searchKeyword,
  };
};
