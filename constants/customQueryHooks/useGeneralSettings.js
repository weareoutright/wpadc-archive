import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query
const GET_GENERAL_SETTINGS = gql`
  query getGeneralSettings {
    generalSettings {
      title
      description
    }
  }
`;

// Custom hook to fetch general settings
const useGeneralSettings = () => {
  const { loading, error, data } = useQuery(GET_GENERAL_SETTINGS);

  return {
    loading,
    error,
    generalSettings: data?.generalSettings || null,
  };
};

export default useGeneralSettings;
