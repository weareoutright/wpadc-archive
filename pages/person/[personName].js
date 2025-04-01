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
} from "../../components";

export default function PersonPage() {
  const router = useRouter();
  const { personName } = router.query;
  const roleType = router.query.roleType;

  const [isNavShown, setIsNavShown] = useState(false);

  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();

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
              <ArtistContainerHeader artistObj={null} />
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
