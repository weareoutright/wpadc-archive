import React from "react";
import { useRouter } from "next/router";
import {
  SEO,
  Header,
  Main,
  Container,
  Footer,
  RelatedSection,
  InThisProjectSection,
  ArtistContainerHeader,
} from "../../components";
import {
  useGeneralSettings,
  useHeaderMenu,
} from "../../constants/customQueryHooks";
import SAMPLE_IMG from "../../assets/sample-artist.png";

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

const DUMMY_ARTIST = {
  artistName: "Artist Name",
  content: (
    <>
      <p>
        laboris magna qui aute nulla cupidatat officia sit in cupidatat elit,
        aliquip in sed labore incididunt elit, magna officia eu pariatur. et
        proident, Excepteur ex minim anim dolore consequat. ipsum culpa minim
        aute ut velit aute culpa incididunt proident, ipsum dolor ut laborum.
        est magna eu anim anim dolor laborum. anim esse dolore in mollit
        nostrud.,
      </p>
      <p>
        laboris magna qui aute nulla cupidatat officia sit in cupidatat elit,
        aliquip in sed labore incididunt elit, magna officia eu pariatur. et
        proident, Excepteur ex minim anim dolore consequat. ipsum culpa minim
        aute ut velit aute culpa incididunt proident, ipsum dolor ut laborum.
        est magna eu anim anim dolor laborum. anim esse dolore in mollit
        nostrud.,
      </p>
      <p>
        laboris magna qui aute nulla cupidatat officia sit in cupidatat elit,
        aliquip in sed labore incididunt elit, magna officia eu pariatur. et
        proident, Excepteur ex minim anim dolore consequat. ipsum culpa minim
        aute ut velit aute culpa incididunt proident, ipsum dolor ut laborum.
        est magna eu anim anim dolor laborum. anim esse dolore in mollit
        nostrud.,
      </p>
    </>
  ),
  quote:
    "laboris magna qui aute nulla cupidatat officia sit in cupidatat elit, aliquip in sed labore incididunt elit, magna officia eu pariatur. et proident, Excepteur ex minim anim dolore consequat. ipsum culpa minim aute ut velit aute culpa incididunt proident, ipsum dolor ut laborum.",
  quote_author: "Misha Ilin",
  img: SAMPLE_IMG,
  externalLinksArr: [
    { name: "external-link1", href: "#" },
    { name: "external-link2", href: "#" },
  ],
};

const ArtistPage = () => {
  const router = useRouter();
  const { uri } = router.query;

  //   const { loading, error, assetPostBySlug } = useArtistBySlug(uri?.join("/"));

  // TODO - create a query that gets artist info by slug/uri
  // TODO - artistPostBySlug = useArtistBySlug(uri?.join("/"))

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

  //   if (!artistPostBySlug) {
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
          <ArtistContainerHeader artistObj={DUMMY_ARTIST} />
          <InThisProjectSection
            headerText="By This Artist"
            itemsArr={DUMMY_ITEMS}
          />
          <RelatedSection itemsArr={DUMMY_ITEMS} />
        </Container>
      </Main>
      <Footer title={generalSettings?.title} menuItems={null} />
    </>
  );
};

export default ArtistPage;
