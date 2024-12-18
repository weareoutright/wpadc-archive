import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query with a slug variable
const GET_ASSET = gql`
  query getAssetBySlug($slug: String!) {
    assetPostBy(slug: $slug) {
      id
      slug
      uri
      assetCard {
        assetInfo {
          ... on AssetCardAssetInfoAcfProAssetCardLayout {
            title
            artists {
              contributors {
                edges {
                  node {
                    id
                  }
                }
              }
              primaryArtistAuthor {
                edges {
                  node {
                    id
                  }
                }
              }
            }
            curator {
              nodes {
                ... on Person {
                  id
                  personCard {
                    personInfo {
                      ... on PersonCardPersonInfoAcfProPersonCardLayout {
                        activeSinceYear
                        currentlyActive
                        fullName
                        location
                        roleType {
                          nodes {
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
            year
            mediaMedium {
              medium {
                nodes {
                  ... on ArtMediumType {
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
`;

// Custom hook to fetch the asset data
const useAssets = (slug) => {
  const { loading, error, data } = useQuery(GET_ASSET, {
    variables: { slug }, // Pass the slug variable here
  });

  return {
    loading,
    error,
    assetPostBySlug: data?.assetPostBy || {}, // Adjusted to match the query structure
  };
};

export default useAssets;
