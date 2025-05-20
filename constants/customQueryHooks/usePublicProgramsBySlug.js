import { gql, useQuery } from "@apollo/client";

const GET_PUBLIC_PROGRAMS_BY_SLUG = gql`
  query getPublicProgramsBySlug($slug: String!) {
      publicProgramBy(slug: $slug) {
        id
        title
        programCard {
          programCard {
            ... on ProgramCardProgramCardProgramCardLayout {
              description
              endDate
              location
              startDate
              artists {
                nodes {
                  ... on Person {
                    id
                    title
                    slug
                    uri
                  }
                }
              }
              curator {
                nodes {
                  ... on Person {
                    id
                    slug
                    uri
                    title
                  }
                }
              }
              eventType
              type {
                nodes {
                  id
                  ... on AssetMediumType {
                    id
                    title
                  }
                }
              }
              thumbnail {
                node {
                  id
                  sourceUrl
                  title
                  caption
                }
              }
              eyebrow {
                nodes {
                  slug
                  uri
                  ... on Person {
                    id
                    title
                  }
                  ... on PublicProgram {
                    id
                    title
                  }
                  ... on Asset_post {
                    id
                    title
                  }
                  ... on StoryBlogPost {
                    id
                    title
                  }
                }
              }
              tags {
                nodes {
                  slug
                  uri
                  ... on AssetTag {
                    id
                    title
                  }
                  ... on Asset_post {
                    id
                    title
                  }
                  ... on Person {
                    id
                    title
                  }
                  ... on PublicProgram {
                    id
                    title
                  }
                }
              }
              workshops {
                workshops {
                  nodes {
                    uri
                    slug
                    id
                  }
                }
              }
              parent {
                nodes {
                  id
                  slug
                  uri
                }
              }
            }
          }
        }
      }
    }
`;

// Custom hook to fetch the public program data by slug
const usePublicProgramsBySlug = (slug) => {
  const { loading, error, data } = useQuery(GET_PUBLIC_PROGRAMS_BY_SLUG, {
    variables: { slug },
  });

  return {
    loading,
    error,
    publicProgram: data?.publicProgramBy || {},
  };
};

export default usePublicProgramsBySlug;