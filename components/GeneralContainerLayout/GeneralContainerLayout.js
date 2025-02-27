import styles from "./GeneralContainerLayout.module.scss";
import className from "classnames/bind";
import { RelatedSection } from "../RelatedSection";

let cx = className.bind(styles);

const GeneralContainerLayout = ({ itemsArr }) => {
  return (
    <div className={cx("GeneralContainerLayout")}>
      <RelatedSection itemsArr={itemsArr} />
    </div>
  );
};

export default GeneralContainerLayout;
