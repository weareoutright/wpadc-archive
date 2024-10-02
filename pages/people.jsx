/**
 *? What kind of search results do we want to be able to search for? Anything and everything within the archive (People, art, media, etc) ? or only specific types of content (e.g. People and Art?)
 *
 */

import { useQuery } from "@apollo/client";
import {
  useGeneralSettings,
  useHeaderMenu,
} from "../constants/customQueryHooks";
import { gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { capitalizeString } from "../constants/capitalizeString";
import {
  Header,
  Footer,
  Main,
  Container,
  SEO,
  NavigationMenu,
  LoadingPage,
} from "../components";
import usePeopleIDsRoles from "../constants/customQueryHooks/usePeopleIDsRoles";

const roleTypeOrganizer = {
  visibleRoleTypes: ["staff", "board_member", "volunteer"],
  staff: (staffArr) => {
    <div className="staff">
      <h2>Staff</h2>
      {staffArr.map((person) => {
        <div className="person-card">{person.fullName}</div>;
      })}
    </div>;
  },
  board: (boardArr) => {
    <div className="board">
      <h2>Board</h2>
      {boardArr.map((person) => {
        <div className="person-card">{person.fullName}</div>;
      })}
    </div>;
  },
  volunteer: (volunteerArr) => {
    <div className="board">
      <h2>Volunteers</h2>
      {volunteerArr.map((person) => {
        <div className="person-card">{person.fullName}</div>;
      })}
    </div>;
  },
};

export default function Component() {
  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();
  const {
    loading: loadingIDsRoles,
    error: errorIDsRoles,
    idsAndRoles,
  } = usePeopleIDsRoles(roleTypeOrganizer.visibleRoleTypes);

  const { loading, error, data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const primaryMenu = menus;
  const allPeopleArr = data?.allPeople.nodes;
  console.log(idsAndRoles);

  if (loading || loadingSettings || loadingMenus) return <LoadingPage />;
  if (errorSettings || errorMenus || error) {
    console.error("Settings ERROR:", errorSettings?.message);
    console.error("Menus ERROR:", errorMenus?.message);
    console.error("Data ERROR:", error?.message);
  }

  return (
    <>
      <SEO
        title={generalSettings.title}
        description={generalSettings.description}
      />
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
        menuItems={primaryMenu}
      />
      <Main>
        <Container>
          <div className="People">
            <h1>People</h1>
          </div>
        </Container>
      </Main>
      <Footer title={generalSettings.title} menuItems={null} />
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    allPeople: people {
      nodes {
        personCard {
          personInfo {
            ... on PersonCardPersonInfoAcfProPersonCardLayout {
              activeSinceYear
              currentlyActive
              fullName
              headshot {
                node {
                  sourceUrl
                  title
                }
              }
              location
              role_type {
                role {
                  nodes {
                    ... on PersonRoleType {
                      id
                      roleType {
                        role_type
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
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
