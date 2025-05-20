import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

export const SEARCH_CONTENT = gql`
  query SearchContent($searchTerm: String!) {
    assetPosts(where: { search: $searchTerm }) {
      nodes {
        id
        title
        slug
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    posts(where: { search: $searchTerm }) {
      nodes {
        id
        title
        slug
        uri
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    people(where: { search: $searchTerm }) {
      nodes {
        id
        title
        slug
        uri
        personCard {
          personInfo {
            profileImage {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  }
`;

const flattenSearchResults = (data) => {
  if (!data) return [];

  const assets = data.assetPosts?.nodes || [];
  const blogPosts = data.posts?.nodes || [];
  const people = data.peoplePosts?.nodes || [];

  const taggedAssets = assets.map((item) => ({
    ...item,
    __typename: "AssetPost",
  }));

  const taggedBlogPosts = blogPosts.map((item) => ({
    ...item,
    __typename: "Post",
  }));

  const taggedPeople = people.map((item) => ({
    ...item,
    __typename: "PersonPost",
  }));

  return [...taggedAssets, ...taggedBlogPosts, ...taggedPeople];
};

const useSearch = (searchTerm) => {
  const {
    data: rawData,
    loading,
    error,
  } = useQuery(SEARCH_CONTENT, {
    variables: { searchTerm },
    skip: !searchTerm, // avoid firing on empty string
  });

  const flattenedResults = flattenSearchResults(rawData);

  return {
    loading,
    error,
    rawData,
    flattenedResults,
  };
};

export default useSearch;
