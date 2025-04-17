import React, { useState } from "react";
import useAssetsBySlug from "../../constants/customQueryHooks/useAssetsBySlug";
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

  // if (loading) {
  //   return <div className="AssetPage">Loading...</div>;
  // }

  // if (error) {
  //   return <div className="AssetPage">Error: {error.message}</div>;
  // }

  // if (!assetPostBySlug) {
  //   return <div className="AssetPage">No asset found for this URI.</div>;
  // }

  console.log(assetPostBySlug?.assetCard);

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
      <Main>
        <Container>
          {assetPostBySlug && !loadingAssetPostBySlug && (
            <div className="AssetPage">
              <ContainerHeader
                programName={null}
                artistName={null}
                assetName={assetPostBySlug?.assetCard.assetCard[0].title || ""}
                eventName={null}
                description={
                  assetPostBySlug?.assetCard.assetCard[0].description ||
                  ""
                }
                tagsArr={
                  assetPostBySlug?.assetCard?.assetCard[0]?.assetTags[0]?.assetTag?.edges || []
                }
                dateBegin={null}
                dateEnd={null}
                type={null}
                location={assetPostBySlug?.assetCard.assetCard[0].location}
                externalLinksArr={
                  assetPostBySlug?.assetCard.assetCard[0].externalLinks
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
      <Footer title={generalSettings?.title} menuItems={null} />
    </>
  );
};

export default AssetPage;
