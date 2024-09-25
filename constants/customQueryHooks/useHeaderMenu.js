import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query
const GET_HEADER_MENU = gql`
  query getHeaderMenu {
    menus {
      edges {
        node {
          name
          menuItems {
            edges {
              node {
                id
                uri
                label
              }
            }
          }
        }
      }
    }
  }
`;

// Custom hook to fetch the header menu data
const useHeaderMenu = () => {
  const { loading, error, data } = useQuery(GET_HEADER_MENU);

  return {
    loading,
    error,
    menus: data?.menus?.edges || [],
  };
};

export default useHeaderMenu;
