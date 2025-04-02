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

const AssetPage = () => {
  const router = useRouter();
  const { uri } = router.query;
  const [isNavShown, setIsNavShown] = useState(false);

  // const { loading, error, assetPostBySlug } = useAssetsBySlug(uri?.join("/"));

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
          <div className="AssetPage">
            <ContainerHeader
              programName={null}
              artistName={null}
              assetName={null}
              eventName={null}
              description={null}
              tagsArr={null}
              dateBegin={null}
              dateEnd={null}
              type={null}
              location={null}
              externalLinksArr={null}
              pageType={null}
              parentLink={null}
            />
            <InThisProjectSection
              headerText="In This Project"
              itemsArr={null}
              frontPageCarousel={false}
            />
            <RelatedSection itemsArr={null} />
          </div>
        </Container>
      </Main>
      <Footer title={generalSettings?.title} menuItems={null} />
    </>
  );
};

export default AssetPage;
