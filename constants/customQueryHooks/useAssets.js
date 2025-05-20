import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query with a slug variable
const GET_ASSET = gql`
  query getAssetByKeyword($keyword: String!) {
    assetPosts(where: { search: $keyword }) {
      edges {
        node {
          id
          assetCard {
            assetInfo {
              ... on AssetCardAssetCard_Layout {
                fieldGroupName
                title
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
    assetPosts: data?.assetPosts || {}, // Adjusted to match the query structure
  };
};

export default useAssets;
