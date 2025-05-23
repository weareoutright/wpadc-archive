import React from "react";
import useAssetsBySlug from "../../../constants/customQueryHooks/useAssetsBySlug";
import { useRouter } from "next/router";
import {
  SEO,
  Header,
  Main,
  Container,
  Footer,
  ContainerHeader,
  RelatedSection,
} from "../../../components";
import {
  useGeneralSettings,
  useHeaderMenu,
} from "../../../constants/customQueryHooks";

const PublicProgramsPage = () => {
  const router = useRouter();
  const { uri } = router.query;

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
      />
      <Main>
        <Container>
          <div className="AssetPage">
            <ContainerHeader pageType="event" />
            <RelatedSection itemsArr={null} />
          </div>
        </Container>
      </Main>
      <Footer title={generalSettings?.title} menuItems={null} />
    </>
  );
};

export default PublicProgramsPage;
