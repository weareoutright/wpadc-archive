import classNames from "classnames/bind";
// import { Container, NavigationMenu } from "../../components";
import styles from "./Footer.module.scss";
import WPA_FOOTER_LOGO from "../../assets/footer/wpa-footer-logo.svg";
import WPA_IG from "../../assets/footer/ig-icon.svg";
import WPA_VIMEO from "../../assets/footer/vimeo-icon.svg";
import Image from "next/image";

let cx = classNames.bind(styles);

export default function Footer({ title, menuItems, currentRoute }) {
  const year = new Date().getFullYear();
  const isFrontPage = currentRoute === "/";

  return (
    <footer className={cx("component", isFrontPage && "front-page-footer")}>
      {/* <NavigationMenu menuItems={menuItems} currentPage={currentPage} /> */}
      <div className={cx("left-footer")}>
        <a
          className={cx("newsletter-btn", isFrontPage && "newsletter-btn-dark")}
        >
          Join Our Newsletter
        </a>
        <div className={cx("footer-logo")}>
          <a href="#">
            <Image src={WPA_FOOTER_LOGO} alt="Home" />
          </a>
          <p>Washington, DC | info@wpadc.org</p>
        </div>
      </div>
      <div className={cx("right-footer")}>
        <div className={cx("footer-social-icons")}>
          <a href="#">
            <Image src={WPA_IG} alt="WPA - Instagram" />
          </a>
          <a href="#">
            <Image src={WPA_VIMEO} alt="WPA - Vimeo" />
          </a>
        </div>
        <p className={cx("copyright")}>© All rights reserved | {year}</p>
      </div>
    </footer>
  );
}
