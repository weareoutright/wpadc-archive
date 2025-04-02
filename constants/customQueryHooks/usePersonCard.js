// import { gql, useQuery } from "@apollo/client";
//
// // Define the GraphQL query
// const GET_PERSON_CARD = gql`
//   query getPersonCard($title: String!) {
//     people (where: {title: $title}){
//       nodes {
//       title
//       modified
//         personCard {
//           personInfo {
//             ... on PersonCardPersonInfoPersonCardLayout {
//               activeSinceYear
//               fullName
//               location
//               roleType {
//                 edges {
//                   node {
//                     ... on PersonRoleType {
//                       id
//                       title
//                     }
//                   }
//                 }
//               }
//               bodyCopy
//               externalLinks {
//                 url
//               }
//               quote
//               quotee
//             }
//           }
//         }
//       }
//     }
//   }
// `;
//
// // Custom hook to fetch the header menu data
// const usePersonCards = (title) => {
//     const { loading, error, data } = useQuery(GET_PERSON_CARD, {
//         variables: { title },
//     });
//
//     console.log("People here:", data?.people?.nodes);
//
//
//     data?.people?.nodes.forEach((person) => {
//         const roleTypes = person?.personCard?.personInfo?.[0]?.roleType?.edges || [];
//
//         const roles = person?.personCard?.personInfo?.[0]?.roleType?.edges?.map(edge => edge.node.title);
//         console.log(`Roles for ${person?.personCard?.personInfo?.[0]?.fullName}:`, roles);
//
//         roleTypes.forEach((edge) => {
//             console.log("Person:", person?.personCard?.personInfo?.[0]?.fullName);
//             console.log("Role Type ID:", edge.node.id, "Role Type Title:", edge.node.title);
//         });
//     });
//
//     return {
//         loading,
//         error,
//         data,
//         people: processedPeople,
//     };
// };
//
// export default usePersonCards;