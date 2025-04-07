import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  useGeneralSettings,
  useHeaderMenu,
} from "../constants/customQueryHooks";
import { gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import ABOUT_FEATURED_IMAGE from "../assets/about-featured-image.png";
import {
  Header,
  Footer,
  Main,
  Container,
  SEO,
  NavigationMenu,
  LoadingPage,
  FullWidthLink,
} from "../components";
import RIGHT_ARROW from "../assets/icons/arrow-right-90-deg.svg";
import RIGHT_ARROW_WHITE from "../assets/icons/arrow-right-90-deg-white.svg";
import { PageContentWrapper } from "../components/PageContentWrapper";
import classNames from "classnames/bind";
import styles from "../components/PageContentWrapper/PageContentWrapper.module.scss";
import FullWidthLinkStyles from "../components/FullWidthLink/FullWidthLink.module.scss";
import useAboutBlocks from "../constants/customQueryHooks/useAboutBlocks";
import parse from "html-react-parser";

let cx = classNames.bind(styles);
let FullWidthLinkCx = classNames.bind(FullWidthLinkStyles);

export default function Component(props) {
  const [isNavShown, setIsNavShown] = useState(false);
  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();

  const { loading, error, data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const {
    loading: loadingAbout,
    error: errorAbout,
    data: dataAbout,
  } = useAboutBlocks();

  const primaryMenu = menus;

  if (loading || loadingSettings || loadingMenus)
    return <LoadingPage stroke="#f66639" />;
  if (errorSettings || errorMenus || error || errorAbout) {
    console.error("Settings ERROR:", errorSettings?.message);
    console.error("Menus ERROR:", errorMenus?.message);
    console.error("Data ERROR:", error?.message);
  }

  console.log(dataAbout);

  return (
    <>
      <SEO
        title={generalSettings.title}
        description={generalSettings.description}
      />
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
        menuItems={primaryMenu}
        currentRoute={"/about"}
        isNavShown={isNavShown}
        setIsNavShown={setIsNavShown}
      />
      {!isNavShown && (
        <>
          <Main className="main-about-container" isFrontPage={false}>
            <Container className="about-container">
              <div className="About">
                <div className="page-description">
                  {dataAbout?.pages.edges?.[0]?.node?.aboutBlocks?.howToUseTheArchive &&
                      dataAbout.pages.edges[0].node.aboutBlocks.howToUseTheArchive.length > 0 &&
                      dataAbout.pages.edges[0].node.aboutBlocks.howToUseTheArchive[0]
                          ?.howToUseTheArchiveContent &&
                      parse(
                          dataAbout.pages.edges[0].node.aboutBlocks.howToUseTheArchive[0]
                              .howToUseTheArchiveContent
                      )}
                </div>
                <div className="page-content">
                  <div className={"img-container"}>
                    {dataAbout?.pages.edges?.[0]?.node?.aboutBlocks?.aboutContentBlocks &&
                        dataAbout.pages.edges[0].node.aboutBlocks.aboutContentBlocks.length > 0 &&
                        dataAbout.pages.edges[0].node.aboutBlocks.aboutContentBlocks[0]
                            ?.aboutFeaturedImage && (
                            <img
                                className="about-featured-image"
                                src={
                                    dataAbout.pages.edges[0].node.aboutBlocks.aboutContentBlocks[0]
                                        ?.aboutFeaturedImage?.node?.sourceUrl || ABOUT_FEATURED_IMAGE
                                }
                                alt={`${
                                    dataAbout?.pages.edges?.[0]?.node?.aboutBlocks?.title
                                        ? parse(dataAbout.pages.edges[0].node.aboutBlocks.title)
                                        : "Featured Image"
                                }`}
                            />
                        )}
                  </div>
                  <div className="text-content">
                    <h2>
                      {" "}
                      {dataAbout?.pages.edges?.[0]?.node?.aboutBlocks?.aboutContentBlocks &&
                          dataAbout.pages.edges[0].node.aboutBlocks.aboutContentBlocks.length > 0 &&
                          dataAbout.pages.edges[0].node.aboutBlocks.aboutContentBlocks[0]
                              ?.aboutPageHeader &&
                          parse(
                              dataAbout.pages.edges[0].node.aboutBlocks.aboutContentBlocks[0]
                                  ?.aboutPageHeader
                          )
                      }
                    </h2>{" "}
                    {dataAbout?.pages.edges?.[0]?.node?.aboutBlocks?.aboutContentBlocks &&
                        dataAbout.pages.edges[0].node.aboutBlocks.aboutContentBlocks.length > 0 &&
                      parse(
                        dataAbout?.pages.edges[0].node.aboutBlocks
                          .aboutContentBlocks[0]?.aboutContent
                        )
                    }
                    <div className="external-links external-links-light">
                      {" "}
                      {dataAbout?.pages.edges?.[0]?.node?.aboutBlocks?.aboutContentBlocks &&
                        dataAbout.pages.edges[0].node.aboutBlocks.aboutContentBlocks.length > 0 &&
                        dataAbout.pages.edges[0].node.aboutBlocks.aboutContentBlocks[0]?.buttons &&
                        dataAbout.pages.edges[0].node.aboutBlocks.aboutContentBlocks[0].buttons.map(
                            (btn) => (
                                <a key={`about-ext-link-${btn.title}`} href={btn.url}>
                                  {btn.title}{" "}
                                  <Image className="right-arrow" src={RIGHT_ARROW} alt="right arrow" />
                                </a>
                            )
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </Main>
          <PageContentWrapper className="how-to-use-the-archive-container">
            <h2>How to Use the Archive</h2>
            <div className={cx("text-content")}>
              <div className={cx("how-to-use-the-archive")}>
                {dataAbout?.pages.edges?.[0]?.node?.aboutBlocks?.howToUseTheArchive &&
                    dataAbout.pages.edges[0].node.aboutBlocks.howToUseTheArchive.length > 0 &&
                    dataAbout.pages.edges[0].node.aboutBlocks.howToUseTheArchive[0]?.howToUseTheArchiveContent &&
                    parse(
                        dataAbout.pages.edges[0].node.aboutBlocks.howToUseTheArchive[0].howToUseTheArchiveContent
                    )
                }
              </div>
              <div className={cx("submission-btns")}>
                {dataAbout?.pages.edges?.[0]?.node?.aboutBlocks?.howToUseTheArchive &&
                    dataAbout.pages.edges[0].node.aboutBlocks.howToUseTheArchive.length > 0 &&
                    dataAbout.pages.edges[0].node.aboutBlocks.howToUseTheArchive[0]?.buttons &&
                    dataAbout.pages.edges[0].node.aboutBlocks.howToUseTheArchive[0].buttons.length > 0 &&
                    dataAbout.pages.edges[0].node.aboutBlocks.howToUseTheArchive[0].buttons.map((link, index) => (
                        <a key={index} href={link.url} className={cx("submission-btn")}>
                          {link.title} <Image src={RIGHT_ARROW} alt="right arrow" />
                        </a>
                ))}
              </div>
            </div>
          </PageContentWrapper>
          <FullWidthLink
            label={
              <span className={FullWidthLinkCx("label")}>
                <span className={FullWidthLinkCx("link-text")}>PEOPLE</span>{" "}
                <Image
                  className={FullWidthLinkCx("arrow-icon")}
                  src={RIGHT_ARROW_WHITE}
                  alt="right arrow"
                />
              </span>
            }
            path="/people"
            bgHex="6741f5"
            bgImg="../assets/front-page/full-width-link-bg-sample.svg"
          />
          <Footer title={generalSettings.title} menuItems={null} />
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
