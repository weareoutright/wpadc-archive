import styles from "./InThisProjectSection.module.scss";
import carouselStyles from "../Carousel/Carousel.module.scss";
import className from "classnames/bind";
import { Carousel } from "../Carousel";
import { FullPageFocusOverlay } from "../FullPageFocusOverlay";
import { useState } from "react";

let cx = className.bind(styles);
let carouselCx = className.bind(carouselStyles);

const InThisProjectSection = ({
  headerText,
  itemsArr = [],
  frontPageCarousel,
}) => {
  const [isOverlayShown, setIsOverlayShown] = useState(false);

  return (
    <>
      {headerText === "Images" && isOverlayShown && (
        <FullPageFocusOverlay setIsOverlayShown={setIsOverlayShown} />
      )}
      <div className={cx("InThisProjectSection")}>
        <h2>
          {headerText} <small>({itemsArr.length} items)</small>
        </h2>
        <div className={cx("in-this-project")}>
          <div className={cx("in-this-project-carousel")}>
            <Carousel
              slides={itemsArr}
              cardType="image"
              setIsOverlayShown={setIsOverlayShown}
              className={carouselCx(
                !frontPageCarousel && "template-page-carousel"
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InThisProjectSection;
