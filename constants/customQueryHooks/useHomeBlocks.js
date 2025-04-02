import { gql, useQuery } from "@apollo/client";

const GET_HOME_BLOCKS = gql`
  query getHomeBlocks {
    pages(where: { title: "home" }) {
      edges {
        node {
          title
          id
          homeBlocks {
            featuredCollectionsStoriesDescription
            featuredCollectionsAndStories {
              fieldGroupName
              featuredCollectionStory {
                edges {
                  node {
                    id
                    slug
                    modified
                    ... on Post {
                      id
                    }
                  }
                }
              }
            }
            featuredArtistsDescription
            featuredArtists {
              artist {
                edges {
                  node {
                    id
                  }
                }
              }
            }
            browseByLinks {
              browseByItem {
                backgroundImage {
                  node {
                    uri
                    id
                  }
                }
                linkTitle
                url
              }
            }
          }
        }
      }
    }
  }
`;

const useHomeBlocks = () => {
  const { loading, error, data } = useQuery(GET_HOME_BLOCKS);

  return {
    loading,
    error,
    data,
  };
};

export default useHomeBlocks;
