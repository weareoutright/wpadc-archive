import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import Image from "next/image";
import LOGO from "../../assets/header/wpa-archive-logo.svg";
import WASHINGTON_PROJECT from "../../assets/header/washington-project.svg";
import FOR_THE_ARTS from "../../assets/header/for-the-arts.svg";
import CLOSE_MENU from "../../assets/full-page-nav/close-full-page-nav.svg";
import { Container, FullPageNav, SkipNavigationLink, NavigationMenu } from "..";
import styles from "./FullPageNavHeader.module.scss";

let cx = classNames.bind(styles);

export default function FullPageNavHeader({
  title = "Headless by WP Engine",
  description,
  menuItems,
  setDisplay,
}) {
  const [isNavShown, setIsNavShown] = useState(false);

  useEffect(() => {
    console.log("close");
  }, [isNavShown]);

  return (
    <header className={cx("component")}>
      <SkipNavigationLink />
      {isNavShown && <FullPageNav />}
      <Container>
        <div className={cx("navbar")}>
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
          <a
            href="#"
            alt="Close Menu"
            aria-label="Toggle navigation"
            aria-controls={cx("primary-navigation")}
            aria-expanded={isNavShown}
            onClick={() => setDisplay("none")}
          >
            <Image src={CLOSE_MENU} alt="Open Menu" />
          </a>
        </div>
      </Container>
    </header>
  );
}
