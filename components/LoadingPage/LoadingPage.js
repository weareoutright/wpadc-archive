import classNames from "classnames/bind";
import * as SELECTORS from "../../constants/selectors";
import styles from "./LoadingPage.module.scss";
import LoadingIcons from "react-loading-icons";

let cx = classNames.bind(styles);

export default function LoadingPage({ children, className, stroke, ...props }) {
  return (
    <div
      id={SELECTORS.LOADING_PAGE_CONTENT}
      tabIndex={-1}
      className={cx(["component", className])}
      {...props}
    >
      <span>
        <LoadingIcons.Grid
          stroke={stroke}
          strokeOpacity={1}
          fill={stroke}
          fillOpacity={1}
        />
      </span>
    </div>
  );
}
