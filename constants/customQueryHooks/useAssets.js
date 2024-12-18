import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query with a slug variable
const GET_ASSET = gql`
  query getAssetByKeyword($keyword: String!) {
    assetsPosts(where: { search: $keyword }) {
      edges {
        node {
          id
          title
          assetCard {
            assetInfo {
              ... on AssetCardAssetInfoAcfProAssetCardLayout {
                fieldGroupName
                title
                year
                assets_files {
                  file {
                    node {
                      sourceUrl
                      title
                      uri
                    }
                  }
                }
                artists {
                  contributors {
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
    }
  }
`;

// Custom hook to fetch the asset data
const useAssets = (keyword) => {
  const { loading, error, data } = useQuery(GET_ASSET, {
    variables: { keyword }, // Pass the slug variable here
  });

  return {
    loading,
    error,
    assetPost: data?.assetsPosts || {}, // Adjusted to match the query structure
  };
};

export default useAssets;
