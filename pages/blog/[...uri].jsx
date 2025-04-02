import React, { useState } from "react";
import useAssetsBySlug from "../../constants/customQueryHooks/useAssetsBySlug";
import { useRouter } from "next/router";
import {
  SEO,
  Header,
  Main,
  Container,
  Footer,
  RelatedSection,
  ContentWrapper,
} from "../../components";
import {
  useGeneralSettings,
  useHeaderMenu,
} from "../../constants/customQueryHooks";
import DEFAULT_IMAGE from "../../assets/checked-bg-minimal-content.png";
import Image from "next/image";

const StoryPage = () => {
  const isStoryPage = true;
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
      {!isNavShown && (
        <>
          <Main
            isStoryPage={isStoryPage}
            style={{
              borderLeft: "1rem solid #6741F5",
              borderTop: "1rem solid #6741F5",
              borderTopLeftRadius: "40px",
              borderBottomLeftRadius: "0rem",
            }}
          >
            <Container>
              <div className="AssetPage Blog">
                <div className="blog-content">
                  <div className="blog-left-col">
                    <Image src={DEFAULT_IMAGE} />
                  </div>
                  <div className="blog-right-col">
                    <div className="wpa-story-tag">WPA Story</div>
                    <h1>Story Title</h1>

                    <div className="blog-metadata">
                      <div className="date">
                        <label>Date</label>
                        <small>August 1, 2024</small>
                      </div>
                      <div className="author">
                        <label>Author</label>
                        <small>Travis Chamberlain</small>
                      </div>
                    </div>

                    <div className="blog-wp-content"></div>
                  </div>
                </div>
                <RelatedSection itemsArr={null} />
              </div>
            </Container>
          </Main>
          <Footer title={generalSettings?.title} menuItems={null} />
        </>
      )}
    </>
  );
};

export default StoryPage;
