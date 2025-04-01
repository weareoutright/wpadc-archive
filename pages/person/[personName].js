import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
} from "../../components";
import usePersonBySlug from "../../constants/customQueryHooks/usePersonBySlug";

export default function PersonPage() {
  const router = useRouter();
  const { personName } = router.query;
  const roleType = router.query.roleType;

  const [isNavShown, setIsNavShown] = useState(false);
  const [artistResult, setArtistResult] = useState({
    personCard: {
      personInfo: {
        fullName: null,
        bodyCopy: null,
        quote: null,
        headshot: null,
        externalLink: null,
      },
      modified: null,
    },
  });

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

  console.log(loadingPerson);

  useEffect(() => {
    setArtistResult(dataPerson);
  }, []);

  //   if (loading) {
  //     return <div className="ArtistPage">Loading...</div>;
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
        isNavShown={isNavShown}
        setIsNavShown={setIsNavShown}
      />
      {!isNavShown && (
        <>
          <Main className={"artist-page"}>
            <Container>
              <ArtistContainerHeader
                artistObj={dataPerson ? dataPerson : artistResult}
              />
              <InThisProjectSection
                headerText="By This Artist"
                itemsArr={null}
                frontPageCarousel={false}
              />
              <RelatedSection itemsArr={null} />
            </Container>
          </Main>
          <Footer title={generalSettings?.title} menuItems={null} />
        </>
      )}
    </>
  );
}
