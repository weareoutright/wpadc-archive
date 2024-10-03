import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query
const GET_PEOPLE_IDS_ROLES = gql`
  query getPeopleIDsRoles {
    people {
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
              roleType {
                edges {
                  node {
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

// Custom hook to fetch the header menu data
const useRoleGroups = (rolesArr) => {
  const { loading, error, data } = useQuery(GET_PEOPLE_IDS_ROLES);
  const roleGroups = {};

  rolesArr.forEach((roleType) => {
    const hasRole = (role) => role.node.roleType.role_type === roleType;
    roleGroups[roleType] = data?.people?.nodes.filter((person) =>
      person.personCard.personInfo[0].roleType.edges.some(hasRole)
    );
  });

  return {
    loading,
    error,
    roleGroups: roleGroups || {},
  };
};

export default useRoleGroups;
