import { gql, useQuery } from "@apollo/client";

const GET_STORY_BLOGS_BY_SLUG = gql`
  query getStoryBlogsBySlug($slug: String!) {
      storyBlogPostBy(slug: $slug) {
        id
        title
        storyBlocks {
          mainContent {
            ... on StoryBlocksMainContentMainContentLayout {
              author
              date
              pageContent
              tags {
                tag {
                  nodes {
                    slug
                    uri
                  }
                }
              }
              thumbnail {
                node {
                  caption
                  altText
                  description
                  sourceUrl
                  title
                }
              }
              externalLinks {
                label
                url
              }
            }
          }
          related {
            relatedItem {
              nodes {
                uri
                id
                slug
                ... on StoryBlogPost {
                  id
                  title
                  storyBlocks {
                    mainContent {
                      ... on StoryBlocksMainContentMainContentLayout {
                        thumbnail {
                          node {
                            altText
                            sourceUrl
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

// Custom hook to fetch the public program data by slug
const useStoryBlogsBySlug = (slug) => {
    const { loading, error, data } = useQuery(GET_STORY_BLOGS_BY_SLUG, {
        variables: { slug },
        fetchPolicy: 'network-only',
        context: { depth: 10 }
    });

    return {
        loading,
        error,
        storyBlog: data?.storyBlogPostBy || {},
    };
};

export default useStoryBlogsBySlug;