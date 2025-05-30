import { useRouter } from "next/router";
import { useState } from "react";
import { useGeneralSettings } from "../../constants/customQueryHooks";
import { useHeaderMenu } from "../../constants/customQueryHooks";
import {
  SEO,
  Header,
  Main,
  Container,
  ArtistContainerHeader,
  InThisProjectSection,
  RelatedSection,
  Footer,
  LoadingPage,
} from "../../components";
import usePersonBySlug from "../../constants/customQueryHooks/usePersonBySlug";
import useAllAssetsByArtist from "../../constants/customQueryHooks/useAllAssetsByArtist";

export default function PersonPage() {
  const router = useRouter();
  const { personName } = router.query;
  const roleType = router.query.roleType;

  const [isNavShown, setIsNavShown] = useState(false);
  const [assetsByArtist, setAssetsByArtist] = useState([]);

  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();

  const {
    loading: loadingPerson,
    error: errorPerson,
    data: dataPerson,
  } = usePersonBySlug(personName);

  const {
    loading: loadingAssets,
    error: errorAssets,
    data: dataAssets,
  } = useAllAssetsByArtist(personName);

  const relatedItems =
    dataPerson?.personCard?.personInfo?.[0]?.related?.flatMap(
      (item) => item.relatedCard?.nodes
    ) ?? [];

  if (loadingAssets) return <LoadingPage stroke="#f63939" />;

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
      {!isNavShown && !loadingPerson && (
        <>
          <Main className={"artist-page"}>
            <Container>
              <ArtistContainerHeader artistObj={dataPerson} />
              {!loadingAssets && (
                <InThisProjectSection
                  headerText="By This Artist"
                  itemsArr={dataAssets}
                  frontPageCarousel={false}
                  // personName={dataPerson.personCard.personInfo[0].fullName}
                />
              )}
              <RelatedSection itemsArr={relatedItems} />
            </Container>
          </Main>
          <Footer title={generalSettings?.title} menuItems={null} />
        </>
      )}
    </>
  );
}
