import classNames from "classnames/bind";
import * as SELECTORS from "../../constants/selectors";
import styles from "./LoadingPage.module.scss";

let cx = classNames.bind(styles);

export default function LoadingPage({ children, className, ...props }) {
  return (
    <div
      id={SELECTORS.LOADING_PAGE_CONTENT}
      tabIndex={-1}
      className={cx(["component", className])}
      {...props}
    >
      Loading...
    </div>
  );
}
