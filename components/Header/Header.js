import { useState } from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import Image from "next/image";
import LOGO from "../../assets/header/wpa-archive-logo.svg";
import WASHINGTON_PROJECT from "../../assets/header/washington-project.svg";
import FOR_THE_ARTS from "../../assets/header/for-the-arts.svg";
import {
  Container,
  NavigationMenu,
  SkipNavigationLink,
} from "../../components";
import styles from "./Header.module.scss";

let cx = classNames.bind(styles);

export default function Header({
  title = "Headless by WP Engine",
  description,
  menuItems,
}) {
  const [isNavShown, setIsNavShown] = useState(false);

  return (
    <header className={cx("component")}>
      <SkipNavigationLink />
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
          <button
            type="button"
            className={cx("nav-toggle")}
            onClick={() => setIsNavShown(!isNavShown)}
            aria-label="Toggle navigation"
            aria-controls={cx("primary-navigation")}
            aria-expanded={isNavShown}
          >
            ☰
          </button>
          <NavigationMenu
            className={cx([
              "primary-navigation",
              isNavShown ? "show" : undefined,
            ])}
            menuItems={menuItems}
          />
        </div>
      </Container>
    </header>
  );
}
