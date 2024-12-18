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
} from "../../components";
import {
  useGeneralSettings,
  useHeaderMenu,
} from "../../constants/customQueryHooks";
import Link from "next/link";
import RIGHT_ARROW from "../../assets/icons/right-arrow.svg";
import Image from "next/image";
import { RelatedItemCard } from "../../components/RelatedItemCard";

const AssetPage = () => {
  const router = useRouter();
  const { uri } = router.query;

  const { loading, error, assetPostBySlug } = useAssetsBySlug(uri?.join("/"));

  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();

  console.group();
  console.log(uri);
  console.log(assetPostBySlug);
  console.log(generalSettings);
  console.groupEnd();

  if (loading) {
    return <div className="AssetPage">Loading...</div>;
  }

  if (error) {
    return <div className="AssetPage">Error: {error.message}</div>;
  }

  if (!assetPostBySlug) {
    return <div className="AssetPage">No asset found for this URI.</div>;
  }

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
            <h1>General Container</h1>
            <div className="container-header">
              <div className="left-column">
                <div className="description">
                  meta-meta is an expansive multi-year interdisciplinary project
                  organized by DC and New York-based artist Misha Ilin,
                  comprising a new book of the artist’s instruction pieces
                  (published by WPA) and an exhibition that brought the book to
                  life through an installation that functioned as the
                  mise-en-scène for a series of public programs and fresh
                  experiments.
                </div>
                <div className="tags">
                  <small>Tags</small>
                  <div className="tag-container">
                    <Link href="#">Harrell Fletcher</Link>
                    <Link href="#">Harrell Fletcher</Link>
                    <Link href="#">Harrell Fletcher</Link>
                    <Link href="#">Harrell Fletcher</Link>
                    <Link href="#">Harrell Fletcher</Link>
                    <Link href="#">Harrell Fletcher</Link>
                  </div>
                </div>
              </div>
              <div className="right-column">
                <div className="meta-data">
                  <small>Date</small>
                  <p>October 14, 2023 – December 9, 2023</p>

                  <small>Type</small>
                  <p>Presentation & Publication</p>

                  <small>Artist</small>
                  <p>Misha Ilin</p>

                  <small>Location</small>
                  <p>Washington Project for the Arts</p>
                </div>
                <div className="external-links">
                  <a href="#">
                    Harrell Fletcher <Image src={RIGHT_ARROW} />
                  </a>
                  <a href="#">
                    Harrell Fletcher <Image src={RIGHT_ARROW} />
                  </a>
                </div>
              </div>
            </div>
            <h2>In This Project</h2>
            <div className="in-this-project">
              <div className="in-this-project-carousel">
                <Carousel cards={null} />
              </div>
            </div>
            <h2>Related</h2>
            <div className="related">
              <RelatedItemCard
                node={{
                  title: "sample",
                  asset_postId: "hello",
                  uri: "hello",
                  author: "sample",
                  slug: "letting-go-documentation",
                }}
              />
              <RelatedItemCard
                node={{
                  title: "sample",
                  asset_postId: "hello",
                  uri: "hello",
                  author: "sample",
                  slug: "letting-go-documentation",
                }}
              />
              <RelatedItemCard
                node={{
                  title: "sample",
                  asset_postId: "hello",
                  uri: "hello",
                  author: "sample",
                  slug: "letting-go-documentation",
                }}
              />
              <RelatedItemCard
                node={{
                  title: "sample",
                  asset_postId: "hello",
                  uri: "hello",
                  author: "sample",
                  slug: "letting-go-documentation",
                }}
              />
              <RelatedItemCard
                node={{
                  title: "sample",
                  asset_postId: "hello",
                  uri: "hello",
                  author: "sample",
                  slug: "letting-go-documentation",
                }}
              />
              <RelatedItemCard
                node={{
                  title: "sample",
                  asset_postId: "hello",
                  uri: "hello",
                  author: "sample",
                  slug: "letting-go-documentation",
                }}
              />
            </div>
          </div>
        </Container>
      </Main>
      <Footer title={generalSettings?.title} menuItems={null} />
    </>
  );
};

export default AssetPage;
