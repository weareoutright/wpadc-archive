import classNames from "classnames/bind";
import styles from "./PageContentWrapper.module.scss";

let cx = classNames.bind(styles);

export default function PageContentWrapper({ children, className, ...props }) {
  return (
    <div className={cx(["component", className])} {...props}>
      <div className={cx("main-top-padding-bg")}>
        <span></span>
      </div>
      <div className={cx("main-top-padding-fg")}>
        <span></span>
      </div>
      {children}
    </div>
  );
}
