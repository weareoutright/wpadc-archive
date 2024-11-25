import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query with a single fullName variable
const GET_ARTWORK_COUNT = gql`
  query getArtworkCount {
    artworksPosts {
      edges {
        node {
          artworkCard {
            artworkInfo {
              ... on ArtworkCardArtworkInfoAcfProArtworkCardLayout {
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
const useArtworkCount = (fullName) => {
  const { loading, error, data } = useQuery(GET_ARTWORK_COUNT, {
    variables: { fullName },
  });

  return {
    loading,
    error,
    artworksPosts: data?.artworksPosts || {},
    artworkCount: data?.artworksPosts?.nodes?.length || 0,
  };
};

export default useArtworkCount;
