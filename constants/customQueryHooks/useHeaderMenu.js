import { gql, useQuery } from "@apollo/client";
import { NavigationMenu } from "../../components/NavigationMenu";

// Define the GraphQL query
const GET_HEADER_MENU = gql`
  query getMainNav {
    menus(where: { location: PRIMARY }) {
      edges {
        node {
          menuItems {
            nodes {
              id
              path
              label
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
    menus: data?.menus?.edges[0].node.menuItems.nodes || [],
  };
};

export default useHeaderMenu;
