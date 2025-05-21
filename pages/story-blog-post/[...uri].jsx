import React, { useState } from "react";
import useAssetsBySlug from "../../constants/customQueryHooks/useAssetsBySlug";
import useStoryBlogsBySlug from "../../constants/customQueryHooks/useStoryBlogsBySlug";
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
import parse from "html-react-parser";
import usePublicProgramsBySlug from "../../constants/customQueryHooks/usePublicProgramsBySlug";

const StoryPage = () => {
  const isStoryPage = true;
  const router = useRouter();
  const { uri } = router.query;
  const [isNavShown, setIsNavShown] = useState(false);

  // console.log('story', publicProgram);
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

  const {
    loading: loadingStoryBlog,
    error: errorStoryBlog,
    storyBlog: storyBlogData,
  } = useStoryBlogsBySlug(uri?.join("/"));

  const title = storyBlogData?.title;
  const mainContent = storyBlogData?.storyBlocks?.mainContent?.[0];
  const pageBodyContent = mainContent?.pageContent || "";
  const parsedPageContent = parse(pageBodyContent);

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
            className={"story-blog-page"}
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
                    <Image
                        src={mainContent?.thumbnail?.node?.sourceUrl || DEFAULT_IMAGE}
                        alt={mainContent?.thumbnail?.node?.altText || ""}
                        width={244} height={326} />
                  </div>
                  <div className="blog-right-col">
                    <div className="wpa-story-tag">
                      <span>WPA Story</span>
                    </div>
                    <h1>{title}</h1>

                    <div className="blog-metadata">
                      {mainContent?.date && (
                          <div className="date">
                            <label>Date</label>
                            <small>
                              {new Date(mainContent.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                timeZone: "UTC",
                              })}
                            </small>
                          </div>
                      )}
                      <div className="author">
                        {mainContent?.author && (
                            <label>Author</label>
                        )}
                        <small>{mainContent?.author || ""}</small>
                      </div>
                    </div>

                    <div className="blog-wp-content">{parsedPageContent}</div>
                  </div>
                </div>
                <RelatedSection className="related-blog" itemsArr={null} />
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
