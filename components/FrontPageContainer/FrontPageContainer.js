import styles from "./FrontPageContainer.module.scss";
import className from "classnames/bind";

let cx = className.bind(styles);

export default function FrontPageContainer({ children, className, bgColor }) {
  return (
    <div
      className={cx(["component", "front-page-container"])}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </div>
  );
}
