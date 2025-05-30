import { gql, useQuery } from "@apollo/client";

const GET_PUBLIC_PROGRAMS_KEYWORD_SEARCH = gql`
  query getPublicProgramByKeyword($searchKeyword: String!) {
    publicPrograms(where: { search: $searchKeyword }) {
      edges {
        node {
          id
          title
          slug
          programCard {
            programCard {
              ... on ProgramCardProgramCardProgramCardLayout {
                description
                endDate
                eventType
                eyebrow {
                  edges {
                    node {
                      id
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

// Custom hook to fetch the public program data by slug
const usePublicProgramsKeywordSearch = (searchKeyword) => {
  const { loading, error, data } = useQuery(
    GET_PUBLIC_PROGRAMS_KEYWORD_SEARCH,
    {
      variables: { searchKeyword },
    }
  );

  return {
    loading,
    error,
    publicPrograms: data?.publicPrograms.edges || [],
  };
};

export default usePublicProgramsKeywordSearch;
