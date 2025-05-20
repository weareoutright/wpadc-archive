import { gql, useQuery } from "@apollo/client";

const GET_ALL_ASSETS_BY_ARTIST = gql`
  query getAllAssetsByArtist {
    assetPosts {
      edges {
        node {
          id
          title
          slug
          assetCard {
            assetCard {
              ... on AssetCardAssetCard_Layout {
                description
                artists {
                  collaborator {
                    edges {
                      node {
                        id
                        ... on Person {
                          id
                          personCard {
                            personInfo {
                              ... on PersonCardPersonInfo_Layout {
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
  }
`;

const useAllAssetsByArtist = (artistName) => {
  const { loading, error, data } = useQuery(GET_ALL_ASSETS_BY_ARTIST);

  return {
    loading,
    error,
    data,
  };
};

export default useAllAssetsByArtist;
