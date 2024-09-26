import { gql, useQuery } from "@apollo/client";
import { NavigationMenu } from "../../components/NavigationMenu";

// Define the GraphQL query
const GET_HEADER_MENU = gql`
  ${NavigationMenu.fragments.entry}
  query getHeaderMenu($headerLocation: MenuLocationEnum) {
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
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
    menus: data?.headerMenuItems?.nodes || [],
  };
};

export default useHeaderMenu;
