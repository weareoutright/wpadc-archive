import { gql, useQuery } from "@apollo/client";

const GET_HOME_BLOCKS = gql`
  query getHomeBlocks {
    pages(where: { title: "Home" }) {
      edges {
        node {
          title
          id
          homeBlocks
        }
      }
    }
  }
`;

const useHomeBlocks = () => {
  const { loading, error, data } = useQuery(GET_HOME_BLOCKS);

  return {
    loading,
    error,
    data,
  };
};

export default useHomeBlocks;
