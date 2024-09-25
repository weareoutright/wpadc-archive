import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query
const GET_GLOBAL_CONTENT = gql`
  query getGlobalContent {
    globalContent {
      globalContentFields {
        logo {
          node {
            id
            sourceUrl
          }
        }
        copyright
        full_address
        email
        phoneNumber
      }
      pageTitle
    }
  }
`;

// Custom hook to fetch the global content data
const useGlobalContent = () => {
  const { loading, error, data } = useQuery(GET_GLOBAL_CONTENT);

  return {
    loading,
    error,
    globalContent: data?.globalContent || null,
  };
};

export default useGlobalContent;
