/**
 *? What kind of search results do we want to be able to search for? Anything and everything within the archive (People, art, media, etc) ? or only specific types of content (e.g. People and Art?)
 *
 */
import Image from "next/image";
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

let cx = classNames.bind(styles);
let FullWidthLinkCx = classNames.bind(FullWidthLinkStyles);

export default function Component(props) {
  const {
    loading: loadingSettings,
    error: errorSettings,
    generalSettings,
  } = useGeneralSettings();

  const { loading: loadingMenus, error: errorMenus, menus } = useHeaderMenu();

  const { loading, error, data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const primaryMenu = menus;

  if (loading || loadingSettings || loadingMenus) return <LoadingPage />;
  if (errorSettings || errorMenus || error) {
    console.error("Settings ERROR:", errorSettings?.message);
    console.error("Menus ERROR:", errorMenus?.message);
    console.error("Data ERROR:", error?.message);
  }

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
      />
      <Main className="main-about-container" isFrontPage={false}>
        <Container className="about-container">
          <div className="About">
            <div className="page-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
              vitae mattis tellus. Nullam quis imperdiet augue.
            </div>
            <div className="page-content">
              <Image
                className="about-featured-image"
                src={ABOUT_FEATURED_IMAGE}
                alt="About The Archive"
              />
              <div className="text-content">
                <h2>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla, mattis ligula consectetur, ultrices mauris.
                  Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                  Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                  Curabitur pellentesque nibh nibh, at maximus ante fermentum
                  sit amet. Pellentesque commodo lacus at sodales sodales.
                </p>
                <div className="external-links external-links-light">
                  {" "}
                  <a href="#">
                    Washington Project for the Arts{" "}
                    <Image
                      className="right-arrow"
                      src={RIGHT_ARROW}
                      alt="right arrow"
                    />
                  </a>
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
              massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
              vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum
              auctor ornare leo, non suscipit magna interdum eu. Curabitur
              pellentesque nibh nibh, at maximus ante fermentum sit amet.
              Pellentesque commodo lacus at sodales sodales.
            </p>
          </div>
          <div className={cx("submission-btns")}>
            <a href="#" className={cx("submission-btn")}>
              Submit Feedback <Image src={RIGHT_ARROW} alt="right arrow" />
            </a>
            <a href="#" className={cx("submission-btn")}>
              Submit Content <Image src={RIGHT_ARROW} alt="right arrow" />
            </a>
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
