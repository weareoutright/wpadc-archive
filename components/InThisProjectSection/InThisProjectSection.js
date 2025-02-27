import styles from "./InThisPrrojectSection.module.scss";
import className from "classnames/bind";
import { Carousel2 } from "../Carousel2";
import { Carousel } from "../Carousel";

let cx = className.bind(styles);

const InThisProjectSection = ({ itemsArr }) => {
  return (
    <div className={cx("InThisProjectSection")}>
      <h2>
        In This Project <small>({itemsArr.length} items)</small>
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
