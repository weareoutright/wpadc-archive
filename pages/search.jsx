/**
 *? What kind of search results do we want to be able to search for? Anything and everything within the archive (People, art, media, etc) ? or only specific types of content (e.g. People and Art?)
 *
 */

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  useGeneralSettings,
  useHeaderMenu,
  useArtworkCount,
} from "../constants/customQueryHooks";
import { gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { capitalizeString } from "../constants/capitalizeString";
import {
  Header,
  Footer,
  Main,
  Container,
  SEO,
  NavigationMenu,
  LoadingPage,
  SearchBar,
} from "../components";

export default function Component() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState(searchKeyword);

  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();

  const { loading, error, data } = useQuery(Component.query, {
    variables: Component.variables({ searchKeyword: debouncedKeyword }),
    notifyOnNetworkStatusChange: true,
  });

  const artworkSearch = data?.artworkSearch?.edges ?? [];
  const artworkCount = artworkSearch.length || null;
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
      />
      <Main>
        <Container>
          <div className="Search"></div>
          <br></br>
          <br></br>
          <div className="results">
            <div className="artwork-results">
              <h3>
                Artworks {artworkCount > 0 && <span>({artworkCount})</span>}
              </h3>
              <hr></hr>
              {artworkSearch.length > 0 ? (
                artworkSearch.map(({ node }) => (
                  <div key={node.artwork_postId}>
                    <a href={node.uri} className="person-link">
                      <h2>{node.title}</h2>
                    </a>
                    <img
                      src={
                        node.artworkCard.artworkInfo.artwork_files?.file.node
                          .sourceUrl
                      }
                    />
                  </div>
                ))
              ) : (
                <p>
                  {data && loading
                    ? "Searching..."
                    : `No results found for "${debouncedKeyword}"`}
                </p>
              )}
            </div>
            <br></br>
            <br></br>
            <div className="people-results">
              <h3>People</h3>
              <hr></hr>
              {peopleSearch.length > 0 ? (
                peopleSearch.map(({ node }) => {
                  return (
                    <div key={node.uri} className="person-card">
                      <img
                        src={
                          node.personCard.personInfo[0].headshot?.node.sourceUrl
                        }
                        alt={node.personCard.personInfo[0].headshot?.node.title}
                        className="headshot"
                      />

                      <a href={node.uri} className="person-link">
                        <h4>
                          {node.personCard.personInfo[0].fullName ?? "N/A"}
                        </h4>
                      </a>

                      <p>
                        Location:{" "}
                        {node.personCard.personInfo[0].location ?? "N/A"}
                      </p>
                      <p>
                        Start Year:{" "}
                        {node.personCard.personInfo[0].activeSinceYear ?? "N/A"}
                      </p>

                      <p>
                        Status:{" "}
                        {node.personCard.personInfo[0].currentlyActive
                          ? "Currently Active"
                          : "Not Active"}
                      </p>

                      <div>
                        <strong>Title(s): </strong>
                        <ul>
                          {node.personCard.personInfo[0].roleType.edges.map(
                            ({ node }) => (
                              <li key={node.id}>
                                {capitalizeString(node.roleType?.role_type)}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>
                  {" "}
                  {data && loading
                    ? "Searching..."
                    : `No results found for "${debouncedKeyword}"`}
                </p>
              )}
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
    searchKeyword: searchKeyword.trim() === "" ? "_none_" : searchKeyword, // Dynamically update searchKeyword
  };
};
