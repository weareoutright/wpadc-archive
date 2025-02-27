import styles from "./InThisProjectSection.module.scss";
import className from "classnames/bind";
import { Carousel } from "../Carousel";

let cx = className.bind(styles);

const InThisProjectSection = ({ headerText, itemsArr }) => {
  return (
    <div className={cx("InThisProjectSection")}>
      <h2>
        {headerText} <small>({itemsArr.length} items)</small>
      </h2>
      <div className={cx("in-this-project")}>
        <div className={cx("in-this-project-carousel")}>
          <Carousel slides={itemsArr} />
        </div>
      </div>
    </div>
  );
};

export default InThisProjectSection;
