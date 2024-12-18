import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query with a single fullName variable
const GET_ASSET_COUNT = gql`
  query getAssetCount {
    assetsPosts {
      edges {
        node {
          assetCard {
            assetInfo {
              ... on AssetCardAssetInfoAcfProAssetCardLayout {
                title
                artists {
                  primaryArtistAuthor
                  contributors {
                    edges {
                      node {
                        id
                      }
                    }
                    nodes {
                      ... on Person {
                        id
                        personCard {
                          personInfo {
                            ... on PersonCardPersonInfoAcfProPersonCardLayout {
                              currentlyActive
                              fullName
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

// Custom hook to fetch the header menu data
const useAssetCount = (fullName) => {
  const { loading, error, data } = useQuery(GET_ASSET_COUNT, {
    variables: { fullName },
  });

  return {
    loading,
    error,
    assetsPosts: data?.assetsPosts || {},
    assetCount: data?.assetsPosts?.nodes?.length || 0,
  };
};

export default useAssetCount;
