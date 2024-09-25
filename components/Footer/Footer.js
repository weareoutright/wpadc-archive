import classNames from "classnames/bind";
import { Container, NavigationMenu } from "../../components";
import styles from "./Footer.module.scss";

let cx = classNames.bind(styles);

export default function Footer({ title, menuItems, currentPage }) {
  const year = new Date().getFullYear();

  return (
    <footer className={cx("component")}>
      <Container>
        <NavigationMenu menuItems={menuItems} currentPage={currentPage} />
        <p className={cx("copyright")}>{`${title} © ${year}`}</p>
      </Container>
    </footer>
  );
}
