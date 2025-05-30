import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query with a slug variable
const GET_ASSET = gql`
  query getAssetByKeyword($keyword: String!) {
    assetPosts(where: { search: $keyword }) {
      nodes {
        id
        title
        uri
        slug
        assetCard {
          assetCard {
            ... on AssetCardAssetCardAssetCardLayout {
              description
              startDate
              thumbnail {
                node {
                  id
                  uri
                }
              }
              endDate
              year
              location
              eyebrow {
                edges {
                  node {
                    id
                    link
                    slug
                  }
                }
              }
              artists {
                collaborator {
                  edges {
                    node {
                      id
                      slug
                      uri
                      ... on Person {
                        id
                        title
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
    assetPosts: data?.assetPosts.nodes || [], // Adjusted to match the query structure
  };
};

export default useAssets;
