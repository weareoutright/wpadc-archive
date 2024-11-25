import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query with a slug variable
const GET_ARTWORK = gql`
  query GetArtworkBySlug($slug: String!) {
    artworkPostBy(slug: $slug) {
      artworkCard {
        artworkInfo {
          ... on ArtworkCardArtworkInfoAcfProArtworkCardLayout {
            title
            artwork_files {
              file {
                node {
                  sourceUrl
                  srcSet
                  title
                  slug
                  uri
                  id
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
                        }
                      }
                    }
                  }
                }
              }
              primaryArtistAuthor {
                nodes {
                  ... on Person {
                    id
                    personCard {
                      personInfo {
                        ... on PersonCardPersonInfoAcfProPersonCardLayout {
                          activeSinceYear
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
`;

// Custom hook to fetch the artwork data
const useArtwork = (slug) => {
  const { loading, error, data } = useQuery(GET_ARTWORK, {
    variables: { slug }, // Pass the slug variable here
  });

  return {
    loading,
    error,
    artworkPost: data?.artworkPostBy || {}, // Adjusted to match the query structure
  };
};

export default useArtwork;
