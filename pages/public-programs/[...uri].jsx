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

const DUMMY_ITEMS = [
  {
    title: "sample",
    asset_postId: "hello",
    uri: "hello",
    author: "sample",
    slug: "letting-go-documentation",
  },
  {
    title: "sample",
    asset_postId: "hello",
    uri: "hello",
    author: "sample",
    slug: "letting-go-documentation",
  },
  {
    title: "sample",
    asset_postId: "hello",
    uri: "hello",
    author: "sample",
    slug: "letting-go-documentation",
  },
  {
    title: "sample",
    asset_postId: "hello",
    uri: "hello",
    author: "sample",
    slug: "letting-go-documentation",
  },
  {
    title: "sample",
    asset_postId: "hello",
    uri: "hello",
    author: "sample",
    slug: "letting-go-documentation",
  },
  {
    title: "sample",
    asset_postId: "hello",
    uri: "hello",
    author: "sample",
    slug: "letting-go-documentation",
  },
];

const PublicProgramsPage = () => {
  const router = useRouter();
  const { uri } = router.query;
  const [isNavShown, setIsNavShown] = useState(false);

  const { loading, error, assetPostBySlug } = useAssetsBySlug(uri?.join("/"));

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
      {!isNavShown && (
        <>
          <Main>
            <Container>
              <div className="AssetPage">
                <ContainerHeader pageType="public-programs" />
                <InThisProjectSection
                  headerText="In This Series"
                  itemsArr={DUMMY_ITEMS}
                  frontPageCarousel={false}
                />
                <RelatedSection itemsArr={DUMMY_ITEMS} />
              </div>
            </Container>
          </Main>
          <Footer title={generalSettings?.title} menuItems={null} />
        </>
      )}
    </>
  );
};

export default PublicProgramsPage;
