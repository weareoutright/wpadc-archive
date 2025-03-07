import styles from "./FullWidthLink.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function FullWidthLink({ label, path, bgHex = "000", bgImg }) {
  return (
    <a
      href={path}
      className={cx(["component", "full-width-link", "bgColor", label === "PRINT / EPHEMERA" ? "print-wrap" : "",])}
      style={{ backgroundColor: `#${bgHex}` }}
    >
      {label}
    </a>
  );
}
