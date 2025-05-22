import React, { useEffect, useState } from "react";
import useAssetsBySlug from "../../constants/customQueryHooks/useAssetsBySlug";
import { LoadingPage } from "../../components";
import { useRouter } from "next/router";
import {
  SEO,
  Header,
  Main,
  Container,
  Footer,
  ContainerHeader,
  InThisProjectSection,
  RelatedSection,
} from "../../components";
import {
  useGeneralSettings,
  useHeaderMenu,
} from "../../constants/customQueryHooks";
import parse from "html-react-parser";

const AssetPage = () => {
  const router = useRouter();
  const { assetName } = router.query;
  const [isNavShown, setIsNavShown] = useState(false);

  const {
    loading: loadingAssetPostBySlug,
    error: errorAssetPostBySlug,
    assetPostBySlug,
  } = useAssetsBySlug(assetName);

  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();

  if (loadingAssetPostBySlug) {
    return <LoadingPage stroke="#FFF" />;
  }

  // if (error) {
  //   return <div className="AssetPage">Error: {error.message}</div>;
  // }

  // if (!assetPostBySlug) {
  //   return <div className="AssetPage">No asset found for this URI.</div>;
  // }


  // const description = parse(assetPostBySlug?.assetCard?.assetCard?.[0]?.description || "");



  // storyBlogData?.storyBlocks?.related?.flatMap((item) => item.relatedItem.nodes) ?? [];
  
  const assetTitle = assetPostBySlug?.title || "";
  
  const assetCard = assetPostBySlug?.assetCard?.assetCard?.[0];
  const artist = assetCard?.location;
  const relatedItems = assetCard;
  console.log('relatedItems', relatedItems);


  return (
    <>
      <SEO
        title={generalSettings?.title}
        description={generalSettings?.description}
      />
      <Header
        title={generalSettings?.title}
        description={generalSettings?.description}
        menuItems={menus}
        isNavShown={isNavShown}
        setIsNavShown={setIsNavShown}
      />
      {!isNavShown && (
        <Main>
          <Container>
            {assetPostBySlug && !loadingAssetPostBySlug && (
              <div className="AssetPage">
                <ContainerHeader
                  programName={null}
                  artistName={assetCard?.artists
                    ?.flatMap((artist) => artist?.collaborator?.edges || [])
                    .map((edge) => edge?.node?.title)
                    .filter(Boolean)}
                  assetName={assetTitle}
                  eventName={null}
                  description={parse(assetCard?.description || "")}
                  tagsArr={assetCard?.assetTags[0]?.assetTag?.edges?.map(edge => edge.node) || []}
                  dateBegin={assetCard?.startDate}
                  dateEnd={assetCard?.endDate}
                  type={assetCard?.type
                    ?.flatMap((t) => t?.type?.edges || [])
                    .map((edge) => edge?.node?.title)
                    .filter(Boolean)
                    .map(
                      (title) =>
                        title
                          .toLowerCase() // optional: standardize casing first
                          .replace(/\b\w/g, (char) => char.toUpperCase()) // capitalize each word
                    )
                    .join(", ")}
                  location={assetCard?.location}
                  externalLinksArr={
                    assetPostBySlug?.assetCard?.assetCard?.[0]?.externalLinks
                  }
                  pageType={"asset"}
                  parentLink={null}
                />
                <InThisProjectSection
                  headerText="In This Project"
                  itemsArr={null}
                  frontPageCarousel={false}
                />
                <RelatedSection itemsArr={null} />
              </div>
            )}
          </Container>
        </Main>
      )}
      {!isNavShown && (
        <Footer title={generalSettings?.title} menuItems={null} />
      )}
    </>
  );
};

export default AssetPage;
