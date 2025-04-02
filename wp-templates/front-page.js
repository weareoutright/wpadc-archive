import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import {
  Header,
  Footer,
  Main,
  NavigationMenu,
  SEO,
  FrontPageContainer,
  FullWidthLink,
  Carousel,
} from "../components";
import { useRouter } from "next/router";
import { useState } from "react";
import className from "classnames/bind";
import frontPageStyles from "../components/FrontPageContainer/FrontPageContainer.module.scss";
import FullWidthLinkStyles from "../components/FullWidthLink/FullWidthLink.module.scss";
import useHomeBlocks from "../constants/customQueryHooks/useHomeBlocks";

let frontPageContainerCx = className.bind(frontPageStyles);
let FullWidthLinkCx = className.bind(FullWidthLinkStyles);

// const DUMMY_ITEMS = [
//   {
//     title: "sample",
//     asset_postId: "hello",
//     uri: "hello",
//     author: "sample",
//     slug: "test",
//   },
// ];

// const DUMMY_ARTISTS = [
//   {
//     people_postId: "hello",
//     author: "sample",
//     slug: "test",
//   },
// ];

export default function Component() {
  const [isNavShown, setIsNavShown] = useState(false);
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  const {
    loading: loadingHome,
    error: errorHome,
    data: dataHome,
  } = useHomeBlocks();

  const { route } = useRouter();

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
        currentRoute={route}
        isNavShown={isNavShown}
        setIsNavShown={setIsNavShown}
      />
      {!isNavShown && (
        <>
          <Main
            className="front-page-main"
            isFrontPage={true}
            id="front-page-featured"
          >
            <FrontPageContainer bgColor="white">
              <div className={frontPageContainerCx("header-and-desc")}>
                <h3>
                  Featured Collections <br />
                  And Stories
                </h3>
                <p>
                  {
                    dataHome.pages.edges[0].node.homeBlocks
                      .featuredCollectionsStoriesDescription
                  }
                </p>
              </div>

              <Carousel
                slides={null}
                cardType="asset"
                className="front-page-carousel"
              />

              <div
                className={frontPageContainerCx(
                  "featured-artists",
                  "header-and-desc"
                )}
              >
                <h3>Featured Artists</h3>
                <p>
                  {" "}
                  {
                    dataHome.pages.edges[0].node.homeBlocks
                      .featuredArtistsDescription
                  }
                </p>
              </div>
              <Carousel
                slides={null}
                cardType="artist"
                className="front-page-carousel"
              />

              <div
                className={frontPageContainerCx("browse-by", "header-and-desc")}
              >
                <h3 style={{ textWrap: "nowrap" }}>Browse By</h3>
                <p>
                  {" "}
                  {dataHome.pages.edges[0].node.homeBlocks.browseByDescription}
                </p>
              </div>
            </FrontPageContainer>
            <div className={FullWidthLinkCx("front-page-full-width-links")}>
              <FullWidthLink
                label={""}
                path={"/"}
                bgHex={"6741f5"}
                bgImg={"../assets/front-page/full-width-link-bg-sample.svg"}
              />
              <FullWidthLink label={""} path={"/"} bgHex={"f66639"} />
              <FullWidthLink label={""} path={"/"} bgHex={"f63939"} />
              <FullWidthLink label={""} path={"/"} bgHex={"FF00D2"} />
            </div>
          </Main>
          <Footer
            title={siteTitle}
            menuItems={footerMenu}
            currentRoute={route}
          />
        </>
      )}
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
