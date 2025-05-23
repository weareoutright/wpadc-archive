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
  itemsArr,
  frontPageCarousel,
  personName,
}) => {
  // const [isOverlayShown, setIsOverlayShown] = useState(false);
  //
  // const filteredResults = itemsArr?.edges
  //   .filter((edge) => {
  //     const assetCards = edge.node?.assetCard?.assetCard || [];
  //
  //     return assetCards.some((assetCard) =>
  //       assetCard.artists?.some((artist) =>
  //         artist.collaborator?.edges?.some((collabEdge) =>
  //           collabEdge.node?.personCard?.personInfo?.some(
  //             (person) => person.fullName === personName
  //           )
  //         )
  //       )
  //     );
  //   })
  //   .map((edge) => edge.node); // Return the top-level post object

  return (
    <>
      {/*{headerText === "Images" && isOverlayShown && (*/}
      {/*  <FullPageFocusOverlay setIsOverlayShown={setIsOverlayShown} />*/}
      {/*)}*/}
      {/*<div className={cx("InThisProjectSection")}>*/}
      {/*  <h2>*/}
      {/*    {headerText} <small>({filteredResults?.length || "- "} items)</small>*/}
      {/*  </h2>*/}
      {/*  <div className={cx("in-this-project")}>*/}
      {/*    <div className={cx("in-this-project-carousel")}>*/}
      {/*      <Carousel*/}
      {/*        slides={filteredResults}*/}
      {/*        cardType="image"*/}
      {/*        setIsOverlayShown={setIsOverlayShown}*/}
      {/*        personName={personName}*/}
      {/*        className={carouselCx(*/}
      {/*          !frontPageCarousel && "template-page-carousel"*/}
      {/*        )}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};

export default InThisProjectSection;
