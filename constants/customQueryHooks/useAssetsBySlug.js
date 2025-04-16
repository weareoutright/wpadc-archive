import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query with a slug variable
const GET_ASSET = gql`
  query getAssetBySlug($slug: String!) {
    assetPostBy(slug: $slug) {
      id
      slug
      uri
      assetCard {
        assetCard {
          ... on AssetCardAssetCardAssetCardLayout {
            description
            endDate
            eyebrow
            location
            startDate
            title
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
            inThisProject {
              manuallySetCards {
                edges {
                  node {
                    ... on Asset_post {
                      id
                      title
                      slug
                    }
                    ... on Person {
                      id
                      title
                      slug
                    }
                    ... on Post {
                      id
                      slug
                      title
                    }
                  }
                }
              }
            }
            related {
              manuallySetCards {
                edges {
                  node {
                    ... on Asset_post {
                      id
                      slug
                      title
                    }
                    ... on Person {
                      id
                      title
                      slug
                    }
                    ... on Post {
                      id
                      title
                      slug
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
const useAssets = (slug) => {
  const { loading, error, data } = useQuery(GET_ASSET, {
    variables: { slug }, // Pass the slug variable here
  });

  return {
    loading,
    error,
    assetPostBySlug: data?.assetPostBy || {}, // Adjusted to match the query structure
  };
};

export default useAssets;
