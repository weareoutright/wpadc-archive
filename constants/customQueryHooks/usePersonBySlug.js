import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query with a slug variable
const GET_PERSON_BY_SLUG = gql`
  query getPersonBySlug($slug: String!) {
    personBy(slug: $slug) {
      id
      personCard {
        personInfo {
          ... on PersonCardPersonInfoPersonCardLayout {
            activeSinceYear
            bodyCopy
            fullName
            externalLinks {
              linkTitle
              url
            }
            location
            headshot {
              node {
                altText
                caption
                sourceUrl
                title
                description
              }
            }
            quote
            quotee
            roleType {
              edges {
                node {
                  ... on PersonRoleType {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      }
      modified
    }
  }
`;

// Custom hook to fetch the asset data
const usePersonBySlug = (slug) => {
  const { loading, error, data } = useQuery(GET_PERSON_BY_SLUG, {
    variables: { slug }, // Pass the slug variable here
  });

  return {
    loading,
    error,
    data: data?.personBy || {}, // Adjusted to match the query structure
  };
};

export default usePersonBySlug;
