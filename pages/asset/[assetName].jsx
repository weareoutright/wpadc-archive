import React, { useState } from "react";
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

  const assetTitle = assetPostBySlug?.title || "";

  const assetCard = assetPostBySlug?.assetCard?.assetCard?.[0];
  const artist = assetCard?.location;
  const relatedItems = assetCard?.related || [];
  const curator = assetCard?.curator?.nodes || null;
  const parentLink = assetCard?.eyebrow?.nodes?.[0] || null;
  const assetFiles = assetCard?.assetFiles || [];
  const hasImages = assetFiles.length > 0;
  
  console.log('assetCard:', assetCard);
  console.log('assetFiles structure:', JSON.stringify(assetFiles, null, 2));

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
                  curator={curator}
                  eventName={null}
                  description={parse(assetCard?.description || "")}
                  tagsArr={
                    assetCard?.assetTags[0]?.assetTag?.edges?.map(
                      (edge) => edge.node
                    ) || []
                  }
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
                  parentLink={
                    parentLink?.title && parentLink?.uri 
                    ? parentLink 
                    : null
                  }
                />
                {Array.isArray(assetFiles) && assetFiles.length > 0 && (
                    <InThisProjectSection
                        headerText="Images"
                        itemsArr={assetFiles}
                        frontPageCarousel={false}
                    />
                )}

                {/*{Array.isArray(inThisProjectItems) && inThisProjectItems.length > 0 && (*/}
                    <InThisProjectSection
                        headerText="In This Project"
                        itemsArr={null}
                        frontPageCarousel={false}
                    />
                {/*)}*/}
                <RelatedSection itemsArr={relatedItems} />
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
