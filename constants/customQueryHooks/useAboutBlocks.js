import { gql, useQuery } from "@apollo/client";

const GET_ABOUT_BLOCKS = gql`
  query getPageBlocks {
    pages(where: {title: "about the archive"}) {
    edges {
      node {
        title
        id
        aboutBlocks {
          howToUseTheArchive {
            ... on AboutBlocksHowToUseTheArchiveHowToUseTheArchiveBlocksLayout {
              howToUseTheArchiveContent
              buttons {
                title
                url
              }
            }
          }
          aboutContentBlocks {
            ... on AboutBlocksAboutContentBlocksAboutContentLayout {
              aboutContent
              aboutPageDescription
              aboutPageHeader
              aboutFeaturedImage {
                node {
                  sourceUrl
                  title
                }
              }
              buttons {
                title
                url
              }
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
