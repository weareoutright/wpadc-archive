/**
 *? What kind of search results do we want to be able to search for? Anything and everything within the archive (People, art, media, etc) ? or only specific types of content (e.g. People and Art?)
 *
 */

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useGeneralSettings } from "../constants/customQueryHooks"; // Assuming these hooks are correct
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
} from "../components";

export default function Component() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState(searchKeyword);

  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  // Fetch data with the debounced keyword
  const { loading, error, data } = useQuery(Component.query, {
    variables: Component.variables({ searchKeyword: debouncedKeyword }),
    notifyOnNetworkStatusChange: true,
  });

  const artworkSearch = data?.artworkSearch?.edges ?? [];
  const headerMenuItems = data?.headerMenuItems?.nodes ?? [];

  const primaryMenuRef = useRef([]);

  useEffect(() => {
    if (data?.headerMenuItems) {
      primaryMenuRef.current = data.headerMenuItems.nodes ?? [];
    }
  }, [data?.headerMenuItems]);

  const primaryMenu = primaryMenuRef.current;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(searchKeyword);
    }, 300); // 300ms debounce time

    // Cleanup the timeout if the user types within the debounce period
    return () => {
      clearTimeout(handler);
    };
  }, [searchKeyword]);

  if (loadingSettings) return <p>Loading...</p>;
  if (errorSettings || error)
    return <p>Error: {errorSettings?.message || error?.message}</p>;

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value); // Update the search keyword without triggering a re-render immediately
  };

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
      <Main>
        <Container>
          <div className="Search">
            <div className="search-bar">
              <form>
                <input
                  type="text"
                  placeholder="Search"
                  onChange={handleSearch}
                  value={searchKeyword}
                />
              </form>
            </div>
          </div>
          <div className="results">
            <div className="artwork-results">
              <h3>Artworks</h3>
              {artworkSearch.length > 0 ? (
                artworkSearch.map(({ node }) => (
                  <div key={node.artwork_postId}>
                    <h2>{node.title}</h2>
                    <img
                      src={
                        node.artworkCard.artworkInfo.artwork_files?.file.node
                          .sourceUrl
                      }
                    />
                  </div>
                ))
              ) : (
                <p>No results found for "{debouncedKeyword}"</p>
              )}
            </div>
            <div className="people-results">
              <h3>People</h3>
              {artworkSearch.length > 0 ? (
                artworkSearch.map(({ node }) => (
                  <div key={node.artwork_postId}>
                    <h2>{node.title}</h2>
                    <img
                      src={
                        node.artworkCard.artworkInfo.artwork_files?.file.node
                          .sourceUrl
                      }
                    />
                  </div>
                ))
              ) : (
                <p>No results found for "{debouncedKeyword}"</p>
              )}
            </div>
          </div>
        </Container>
      </Main>
      <Footer title={generalSettings.title} menuItems={primaryMenu} />
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
  }
`;

Component.variables = ({ searchKeyword }) => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    searchKeyword: searchKeyword.trim() === "" ? "_none_" : searchKeyword, // Dynamically update searchKeyword
  };
};
