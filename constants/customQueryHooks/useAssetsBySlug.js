import { gql, useQuery } from "@apollo/client";

const GET_ASSET = gql`
  query MyQuery2($slug: String!) {
    assetPostBy(slug: $slug) {
      title
      assetCard {
        assetCard {
        ... on AssetCardAssetCardAssetCardLayout {
          description
          startDate
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
                  ...on Person {
                  id
                  title
                  }
                }
              }
            }
          }
          thumbnail {
            node {
            altText
            caption
            title
            sourceUrl
            }
          }
          curator {
            nodes {
            slug
              ... on Person {
              id
              title
              }
            }
          }
          type {
            type {
              edges {
                node {
                id
                  ... on AssetMediumType {
                  id
                  title
                  }
                }
              }
            }
          }
          assetTags {
            assetTag {
              edges {
                node {
                id
                slug
                uri
                  ... on AssetTag {
                  id
                  title
                  }
                }
              }
            }
          }
          assetFiles {
            file {
              node {
              altText
              caption
              description
              sourceUrl
              title
              }
            }
          }
          externalLinks {
            label
            url
          }
        }
      }
    }
  }
}
`;

// Custom hook to fetch the asset data
const useAssetsBySlug = (slug) => {
  const { loading, error, data } = useQuery(GET_ASSET, {
    variables: { slug },
  });

  return {
    loading,
    error,
    assetPostBySlug: data?.assetPostBy || {}, // Adjusted to match the query structure
  };
};

export default useAssetsBySlug;
