/**
 *? What kind of search results do we want to be able to search for? Anything and everything within the archive (People, art, media, etc) ? or only specific types of content (e.g. People and Art?)
 *
 */

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  useGeneralSettings,
  useHeaderMenu,
  useArtworkCount,
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

  const { loading, error, data } = useQuery(Component.query, {
    variables: Component.variables({
      searchKeyword: searchKeyword || "_none_",
    }),
    notifyOnNetworkStatusChange: true,
    skip: !searchKeyword,
  });

  const artworkSearch = data?.artworkSearch?.edges ?? [];
  const peopleSearch = data?.peopleSearch?.edges ?? [];
  const primaryMenu = menus;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchKeyword]);

  useEffect(() => {
    setSearchKeyword(query.keyword);
  }, []);

  useEffect(() => {
    setResults([...artworkSearch, ...peopleSearch]);
  }, [searchKeyword]);

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
      />
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
                {searchKeyword === "undefined" ? "" : searchKeyword}"{" "}
                <small>{results.length} results</small>
              </h1>
              <hr />
              {results.length > 0 && searchKeyword !== "" ? (
                <>
                  {results?.map((result, index) => {
                    if (result.node.__typename === "Artwork_post") {
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
                </>
              ) : null}
            </div>
          </div>
        </Container>
      </Main>
      <Footer title={generalSettings.title} menuItems={null} />
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

    artworkSearch: artworksPosts(where: { search: $searchKeyword }) {
      edges {
        node {
          artwork_postId
          title
          uri
          artworkCard {
            artworkInfo {
              ... on ArtworkCardArtworkInfoAcfProArtworkCardLayout {
                title
                year
                artwork_files {
                  file {
                    node {
                      sourceUrl
                      title
                      uri
                      id
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
    searchKeyword: searchKeyword, // Dynamically update searchKeyword
  };
};
