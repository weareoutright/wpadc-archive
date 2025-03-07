import classNames from "classnames/bind";
import Link from "next/link";
import Image from "next/image";
import LOGO from "../../assets/header/wpa-archive-logo.svg";
import WASHINGTON_PROJECT from "../../assets/header/washington-project.svg";
import FOR_THE_ARTS from "../../assets/header/for-the-arts.svg";
import CLOSE_MENU from "../../assets/full-page-nav/close-full-page-nav.svg";
import SEARCH_ICON from "../../assets/full-page-nav/search-icon.svg";
import { Container, FullPageNav, SkipNavigationLink } from "..";
import styles from "./FullPageNavHeader.module.scss";

let cx = classNames.bind(styles);

export default function FullPageNavHeader({
  title = "",
  description,
  menuItems,
  setDisplay,
  setIsNavShown,
  isNavShown,
  isFrontPage,
}) {
  return (
    <header className={cx(["component", "full-page-nav-header"])}>
      <SkipNavigationLink />
      {isNavShown && (
        <FullPageNav isNavShown={isNavShown} setIsNavShown={setIsNavShown} />
      )}
      <Container>
        <div className={cx(["navbar", isFrontPage && "front-page-navbar"])}>
          <div className={cx("brand")}>
            <Link href="/">
              <a className={cx("title")}>
                <Image src={LOGO} alt="Home" />
              </a>
            </Link>
            <Link href="/">
              <a className={cx("sub-logo-title")}>
                <Image src={WASHINGTON_PROJECT} alt="Home" />
                <Image src={FOR_THE_ARTS} alt="Home" />
              </a>
            </Link>
            {description && <p className={cx("description")}>{description}</p>}
          </div>
          <div className={cx("full-page-nav-btns")}>
            <a href="/search" alt="Go to Search">
              <Image src={SEARCH_ICON} alt="Go to Search" />
            </a>
            <a
              href="#"
              alt="Close Menu"
              aria-label="Toggle navigation"
              aria-controls={cx("primary-navigation")}
              aria-expanded={isNavShown}
              onClick={() => {
                setDisplay("none");
                setIsNavShown(false);
              }}
            >
              <Image src={CLOSE_MENU} alt="Close Menu" />
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
