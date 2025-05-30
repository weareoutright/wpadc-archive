import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query with a slug variable
const GET_STORY_BLOG_BY_KEYWORD = gql`
  query getStoryBlogByKeyword($searchKeyword: String!) {
    storyBlogPosts(where: { search: $searchKeyword }) {
      edges {
        node {
          id
          title
          uri
          date
          storyBlocks {
            mainContent {
              ... on StoryBlocksMainContentMainContentLayout {
                author
                date
              }
            }
          }
        }
      }
    }
  }
`;

const useStoryBlogs = (searchKeyword) => {
  const { loading, error, data } = useQuery(GET_STORY_BLOG_BY_KEYWORD, {
    variables: { searchKeyword },
  });

  return {
    loading,
    error,
    storyBlogs: data?.storyBlogPosts.edges || [],
  };
};

export default useStoryBlogs;
