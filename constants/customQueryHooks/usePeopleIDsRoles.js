import { gql, useQuery } from "@apollo/client";

// Define the GraphQL query
const GET_PEOPLE_IDS_ROLES = gql`
  query getPeopleIDsRoles {
    people {
      nodes {
        personCard {
          personInfo {
            ... on PersonCardPersonInfoAcfProPersonCardLayout {
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

// Custom hook to fetch the header menu data
const usePeopleRoles = (rolesArr) => {
  const { loading, error, data } = useQuery(GET_PEOPLE_IDS_ROLES);
  const roleGroups = {};

  rolesArr.forEach((roleType) => {
    const hasRole = (person) => person.roleType.role_type === roleType;
    roleGroups[roleType] = data?.people.nodes.filter((person) =>
      person.personCard.personInfo[0].role_type[0].role.nodes.some(hasRole)
    );
  });

  console.log(roleGroups);

  return {
    loading,
    error,
    idsAndRoles: data?.people?.nodes || [],
  };
};

export default usePeopleRoles;
