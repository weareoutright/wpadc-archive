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
                      slug
                      title
                      link
                      featuredImage {
                        node {
                          sourceUrl
                          title
                        }
                      }
                    }
                    ... on Asset_post {
                      id
                      slug
                      title
                      link
                      featuredImage {
                        node {
                          sourceUrl
                          title
                        }
                      }
                    }
                    ... on StoryBlogPost {
                      id
                      slug
                      title
                      uri
                      link
                      featuredImage {
                        node {
                          sourceUrl
                          title
                        }
                      }
                    }
                    ... on PublicProgram {
                      id
                      title
                      uri
                      slug
                      link
                      featuredImage {
                        node {
                          sourceUrl
                          title
                        }
                      }
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
                    link
                    ... on Person {
                      id
                      title
                    }
                  }
                }
              }
            }
            browseByDescription
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
