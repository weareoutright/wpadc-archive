import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query with a slug variable
const GET_PEOPLE = gql`
  query getPeopleByKeyword($searchKeyword: String!) {
    people(where: { search: $searchKeyword }) {
      edges {
        node {
          title
          uri
          slug
          id
          personCard {
            personInfo {
              fieldGroupName
              ... on PersonCardPersonInfoPersonCardLayout {
                headshot {
                  node {
                    altText
                    caption
                    sourceUrl
                    title
                    description
                  }
                }
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
                activeSinceYear
                location
                bodyCopy
                quote
                quotee
                externalLinks {
                  url
                }
                related {
                  relatedCard {
                    nodes {
                      slug
                      id
                      uri
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

const usePeople = (searchKeyword) => {
  const { loading, error, data } = useQuery(GET_PEOPLE, {
    variables: { searchKeyword },
  });

  return {
    loading,
    error,
    people: data?.people.edges || [],
  };
};

export default usePeople;
