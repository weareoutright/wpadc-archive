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
import usePersonBySlug from "../../constants/customQueryHooks/usePersonBySlug";
import usePublicProgramsBySlug from "../../constants/customQueryHooks/usePublicProgramsBySlug";
import parse from "html-react-parser";


export default function PublicProgramsPage () {
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

  const {
    loading: loadingPublicProgram,
    error: errorPublicProgram,
    publicProgram: publicProgramData,
  } = usePublicProgramsBySlug(uri?.join("/"));

  console.log('Public Prog', publicProgramData?.programCard?.programCard?.[0]);

  const programCard = publicProgramData?.programCard?.programCard?.[0];

    // Transform the eyebrow URI if it exists
    const eyebrowData = programCard?.eyebrow?.nodes?.[0];
    const transformedEyebrowData = eyebrowData ? {
      ...eyebrowData,
      uri: eyebrowData.uri?.replace('/public-program/', '/public-programs/')
    } : null;

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
              {publicProgramData && !loadingPublicProgram && (
                  <div className="AssetPage">
                    <ContainerHeader
                        pageType="public-programs"
                        programName={publicProgramData?.title}
                        parentLink={transformedEyebrowData}
                        description={parse(programCard?.description || "")}
                        tagsArr={programCard?.tags?.nodes}
                        dateBegin={programCard?.startDate}
                        dateEnd={programCard?.endDate}
                        type={programCard?.type?.nodes?.map((node) => node?.title)
                            ?.filter(Boolean)
                            ?.map((title) =>
                                title
                                    .toLowerCase()
                                    .replace(/\b\w/g, (char) => char.toUpperCase())
                            )
                            .join(", ")}
                        artistName={programCard?.artists?.nodes?.map((node) => node?.title)}
                        location={programCard?.location}
                    />
                    <InThisProjectSection
                        headerText="In This Series"
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
      )}
    </>
  );
};
