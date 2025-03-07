/**
 *? What kind of search results do we want to be able to search for? Anything and everything within the archive (People, art, media, etc) ? or only specific types of content (e.g. People and Art?)
 *
 */

import { useQuery } from "@apollo/client";
import {
  useGeneralSettings,
  useHeaderMenu,
  useRoleGroups,
} from "../constants/customQueryHooks";
import { gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
// import { capitalizeString } from "../constants/capitalizeString";
import {
  Header,
  Footer,
  Main,
  Container,
  SEO,
  NavigationMenu,
  LoadingPage,
} from "../components";
import { useState } from "react";

const roleTypeOrganizer = {
  /* // TODO: make visibleRoleTypes take in an array of role types set to visible via CMS
     TODO: order matters in the array for it to show up properly on the page
   */

  visibleRoleTypes: ["staff", "volunteer", "board_member"],
  staff: (staffArr) => {
    return (
      <div key="staff-group" className="staff role-group">
        <h3>Staff</h3>
        {staffArr?.map((person, index) => {
          return (
            <div key={`staff-${index}`} className="person-card">
              {person.personCard.personInfo[0].fullName}
            </div>
          );
        })}
      </div>
    );
  },
  board_member: (boardArr) => {
    return (
      <div key="board-member-group" className="board-members role-group">
        <h3>Board</h3>
        {boardArr?.map((person, index) => {
          return (
            <div key={`board-member-${index}`} className="person-card">
              {person.personCard.personInfo[0].fullName}
            </div>
          );
        })}
      </div>
    );
  },
  volunteer: (volunteerArr) => {
    return (
      <div key="volunteer-group" className="volunteer role-group">
        <h3>Volunteers</h3>
        {volunteerArr?.map((person, index) => {
          return (
            <div key={`volunteer-${index}`} className="person-card">
              {person.personCard.personInfo[0].fullName}
            </div>
          );
        })}
      </div>
    );
  },
};

export default function Component() {
  const [isNavShown, setIsNavShown] = useState(false);
  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();
  const {
    loading: loadingRoleGroups,
    error: errorRoleGroups,
    roleGroups,
  } = useRoleGroups(roleTypeOrganizer.visibleRoleTypes);

  const { loading, error, data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const primaryMenu = menus;

  if (loading || loadingSettings || loadingMenus)
    return <LoadingPage stroke="#6741f5" />;
  if (errorSettings || errorMenus || errorRoleGroups || error) {
    console.error("Settings ERROR:", errorSettings?.message);
    console.error("Menus ERROR:", errorMenus?.message);
    console.error("Data ERROR:", error?.message);
    console.error("Role Groups ERROR:", errorRoleGroups?.message);
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
        currentRoute={"/people"}
        isNavShown={isNavShown}
        setIsNavShown={setIsNavShown}
      />
      {!isNavShown && (
        <>
          <Main>
            <Container>
              <div className="People">
                <h1>People</h1>
                {loadingRoleGroups
                  ? "Loading..."
                  : roleTypeOrganizer.visibleRoleTypes.map((role) => {
                      const roleGroupComponent = roleTypeOrganizer[role](
                        roleGroups[role]
                      );
                      return roleGroupComponent;
                    })}
              </div>
            </Container>
          </Main>
          <Footer title={generalSettings.title} menuItems={null} />
        </>
      )}
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
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
