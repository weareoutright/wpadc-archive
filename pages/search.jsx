import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
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

export default function Component() {
  const [isNavShown, setIsNavShown] = useState(false);
  const router = useRouter();
  const { query } = router;

  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState(searchKeyword);
  const [results, setResults] = useState([]);

  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();

  const { loading, error, data, refetch } = useQuery(Component.query, {
    variables: Component.variables({
      searchKeyword: debouncedKeyword || "_none_",
    }),
    notifyOnNetworkStatusChange: true,
    skip: searchKeyword?.trim().length < 1,
  });

  const assetSearch = data?.assetSearch?.edges ?? [];
  const peopleSearch = data?.peopleSearch?.edges ?? [];
  const primaryMenu = menus;

  useEffect(() => {
    if (searchKeyword?.trim() !== debouncedKeyword) {
      setDebouncedKeyword(searchKeyword);
    }
  }, [searchKeyword]);

  useEffect(() => {
    setResults([...assetSearch, ...peopleSearch]);
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
            setSearchKeyword={(keyword) => {
              setSearchKeyword(keyword);
              router.replace(
                {
                  pathname: router.pathname,
                  query: { ...router.query, keyword },
                },
                undefined,
                { shallow: true }
              ); // Prevents full page reload
            }}
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
                    {searchKeyword === undefined ? "" : searchKeyword}"
                    <small>{results.length} results</small>
                  </h1>
                  <hr />
                  {results.length > 0 && searchKeyword !== "" ? (
                    <div className="results-container">
                      {results?.map((result, index) => {
                        console.log("RESULT", result);
                        if (result.node.__typename === "Asset_post") {
                          return (
                            <AssetSearchResultCard
                              key={`asset-card-${index}`}
                              node={result.node}
                            />
                          );
                        }
                        if (result.node.__typename === "Person") {
                          return (
                            <PersonSearchResultCard
                              key={`person-card-${index}`}
                              node={result.node}
                            />
                          );
                        }
                      })}
                    </div>
                  ) : null}
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
      edges {
        node {
          id
          assetCard {
            assetInfo {
              ... on AssetCardAssetInfoAssetCardLayout {
                fieldGroupName
                title
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
          personCard {
            personInfo {
              ... on PersonCardPersonInfoAcfProPersonCardLayout {
                currentlyActive
                fullName
                headshot {
                  node {
                    sourceUrl
                    title
                  }
                }
                location
                activeSinceYear
                roleType {
                  edges {
                    node {
                      ... on PersonRoleType {
                        id
                        roleType {
                          role_type
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
