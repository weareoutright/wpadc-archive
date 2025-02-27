import React from "react";
import useAssetsBySlug from "../../constants/customQueryHooks/useAssetsBySlug";
import { useRouter } from "next/router";
import {
  SEO,
  Header,
  Main,
  Container,
  Footer,
  Carousel,
  RelatedSection,
  ContainerHeader,
  InThisProjectSection,
} from "../../components";
import {
  useGeneralSettings,
  useHeaderMenu,
} from "../../constants/customQueryHooks";
import Link from "next/link";
import RIGHT_ARROW from "../../assets/icons/right-arrow.svg";
import Image from "next/image";
import { RelatedItemCard } from "../../components/RelatedItemCard";

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

const ArtistPage = () => {
  const router = useRouter();
  const { uri } = router.query;

  //   const { loading, error, assetPostBySlug } = useAssetsBySlug(uri?.join("/"));

  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();

  //   if (loading) {
  //     return <div className="ArtistPage">Loading...</div>;
  //   }

  //   if (error) {
  //     return <div className="ArtistPage">Error: {error.message}</div>;
  //   }

  //   if (!assetPostBySlug) {
  //     return <div className="ArtistPage">No asset found for this URI.</div>;
  //   }

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
          <ContainerHeader />
          <InThisProjectSection itemsArr={DUMMY_ITEMS} />
          <RelatedSection itemsArr={DUMMY_ITEMS} />
        </Container>
      </Main>
      <Footer title={generalSettings?.title} menuItems={null} />
    </>
  );
};

export default ArtistPage;
