import { gql, useQuery } from "@apollo/client";

const GET_ABOUT_BLOCKS = gql`
  query getPageBlocks {
    pages(where: { title: "about" }) {
      edges {
        node {
          id
          aboutBlocks {
            aboutContent {
              ... on AboutBlocksAboutContentAboutContentLayout {
                aboutContent
                fieldGroupName
              }
            }
            howToUseTheArchive {
              ... on AboutBlocksHowToUseTheArchiveHowToUseTheArchiveBlocksLayout {
                fieldGroupName
                howToUseTheArchiveContent
              }
            }
          }
        }
      }
    }
  }
`;

const useAboutBlocks = () => {
  const { loading, error, data } = useQuery(GET_ABOUT_BLOCKS);

  return {
    loading,
    error,
    data,
  };
};

export default useAboutBlocks;
