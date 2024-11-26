import { useState } from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import Image from "next/image";
import LOGO from "../../assets/header/wpa-archive-logo.svg";
import WASHINGTON_PROJECT from "../../assets/header/washington-project.svg";
import FRONT_PAGE_LOGO from "../../assets/front-page/wpa-logo-xl.svg";
import FOR_THE_ARTS from "../../assets/header/for-the-arts.svg";
import NAV_MENU_BTN from "../../assets/header/block-menu.svg";
import DOWN_WAYPOINT from "../../assets/front-page/down-waypoint.svg";
import {
  Container,
  FullPageNav,
  NavigationMenu,
  SearchBar,
  SkipNavigationLink,
} from "../../components";
import styles from "./Header.module.scss";

let cx = classNames.bind(styles);

export default function Header({
  title = "Washington Project of the Arts",
  description,
  menuItems,
  currentRoute,
}) {
  const [isNavShown, setIsNavShown] = useState(false);

  const isFrontPage = currentRoute === "/";

  return (
    <header className={cx("component", isFrontPage && "front-page-component")}>
      <SkipNavigationLink />
      {isNavShown && <FullPageNav />}
      <Container className={isFrontPage && "front-page-header-container"}>
        <div className={isFrontPage ? cx("front-page-navbar") : cx("navbar")}>
          <div className={isFrontPage ? cx("front-page-brand") : cx("brand")}>
            <Link href="/">
              <a className={isFrontPage ? cx("front-page-title") : cx("title")}>
                <Image src={LOGO} alt="Home" />
              </a>
            </Link>
            <Link href="/">
              <a
                className={
                  isFrontPage
                    ? cx("front-page-sub-logo-title")
                    : cx("sub-logo-title")
                }
              >
                <Image src={WASHINGTON_PROJECT} alt="Home" />
                <Image src={FOR_THE_ARTS} alt="Home" />
              </a>
            </Link>

            {description && <p className={cx("description")}>{description}</p>}
          </div>
          <button
            type="button"
            className={
              isFrontPage ? cx("front-page-nav-toggle") : cx("nav-toggle")
            }
            onClick={() => setIsNavShown(!isNavShown)}
            aria-label="Toggle navigation"
            aria-controls={cx("primary-navigation")}
            aria-expanded={isNavShown}
          >
            <Image src={NAV_MENU_BTN} alt="open nav" />
          </button>
          <NavigationMenu
            className={cx([
              "primary-navigation",
              isNavShown ? "show" : undefined,
              isFrontPage ? "front-page-primary-nav" : undefined,
            ])}
            menuItems={menuItems}
            isNavShown={isNavShown}
            setIsNavShown={setIsNavShown}
          />
        </div>
        {isFrontPage && (
          <div className={cx("front-page-logo")}>
            <Image
              src={FRONT_PAGE_LOGO}
              alt="Washington Project of the Arts Logo"
            />
          </div>
        )}
        {isFrontPage && <SearchBar isFrontPage={true} />}
        {isFrontPage && (
          <div className={cx("front-page-down-waypoint")}>
            <Image src={DOWN_WAYPOINT} alt={"continue to next section"} />
          </div>
        )}
      </Container>
    </header>
  );
}
