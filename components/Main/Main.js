import classNames from "classnames/bind";
import * as SELECTORS from "../../constants/selectors";
import styles from "./Main.module.scss";

let cx = classNames.bind(styles);

export default function Main({
  children,
  className,
  isFrontPage = false,
  ...props
}) {
  return (
    <main
      id={SELECTORS.MAIN_CONTENT_ID}
      tabIndex={-1}
      className={cx(["component", className])}
      {...props}
    >
      {isFrontPage && (
        <div className={cx("main-top-padding-bg")}>
          <span></span>
        </div>
      )}
      {isFrontPage && (
        <div className={cx("main-top-padding-fg")}>
          <span></span>
        </div>
      )}
      {children}
    </main>
  );
}
