import { gql, useQuery } from "@apollo/client";

const GET_ASSET = gql`
  query MyQuery2 {
    assetPostBy(slug: "to-imagine-a-form-of-life-test") {
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
