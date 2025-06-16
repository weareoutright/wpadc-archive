import styles from "./InThisProjectSection.module.scss";
import carouselStyles from "../Carousel/Carousel.module.scss";
import className from "classnames/bind";
import { Carousel } from "../Carousel";
import { FullPageFocusOverlay } from "../FullPageFocusOverlay";
import { useState, useRef } from "react";
import Image from "next/image";
import LEFT_ARROW from "../../assets/icons/previous-btn-dark.svg";
import RIGHT_ARROW from "../../assets/icons/next-btn.svg";

let cx = className.bind(styles);
let carouselCx = className.bind(carouselStyles);

const InThisProjectSection = ({
  headerText,
  itemsArr,
  frontPageCarousel,
  personName,
}) => {

  const [isOverlayShown, setIsOverlayShown] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const rowRef = useRef(null);
  let filteredResults = [];

  if (headerText === "Images") {
    try {
      if (Array.isArray(itemsArr)) {
        filteredResults = itemsArr
          .map(item => ({
            id: item?.file?.node?.id || Math.random().toString(),
            title: item?.file?.node?.title || 'Untitled',
            sourceUrl: item?.file?.node?.sourceUrl,
            caption: item?.file?.node?.caption,
            description: item?.file?.node?.description,
          }))
          .filter(Boolean);
      }
    } catch (error) {
      return null;
    }

    if (filteredResults.length === 0) return null;
  }

  // ✅ Logic for everything else (GraphQL-style with edges)
  if (headerText !== "Images" && itemsArr?.edges) {
    filteredResults = itemsArr.edges
      .filter((edge) => {
        const assetCards = edge.node?.assetCard?.assetCard || [];
        return assetCards.some((assetCard) =>
          assetCard.artists?.some((artist) =>
            artist.collaborator?.edges?.some((collabEdge) =>
              collabEdge.node?.personCard?.personInfo?.some(
                (person) => person.fullName === personName
              )
            )
          )
        );
      })
      .map((edge) => edge.node);
  }

  const scrollRow = (direction) => {
    if (rowRef.current) {
      rowRef.current.scrollLeft += direction * 300; // adjust scroll amount as needed
    }
  };

  return (
    <>
      {headerText === "Images" && isOverlayShown && (
        <FullPageFocusOverlay
          images={filteredResults}
          selectedIndex={selectedImageIndex}
          setSelectedIndex={setSelectedImageIndex}
          setIsOverlayShown={setIsOverlayShown}
        />
      )}
      <div className={cx("InThisProjectSection")}>
        <h2>
          {headerText} <small>({filteredResults?.length || "- "} items)</small>
        </h2>
        {headerText === "Images" ? (
          <div className={cx("in-this-project-carousel-wrapper")}> 
          <div className={cx("carousel-controls")}> 
              <button className={cx("scroll-btn", "left")} onClick={() => scrollRow(-1)}>
                <Image src={LEFT_ARROW} alt="Scroll left" />
              </button>
              <button className={cx("scroll-btn", "right")} onClick={() => scrollRow(1)}>
                <Image src={RIGHT_ARROW} alt="Scroll right" />
              </button>
            </div>
            <div
              className={cx("in-this-project-carousel")}
              ref={rowRef}
              style={{ overflowX: "auto", whiteSpace: "nowrap" }}
            >
              {filteredResults.map((img, idx) => (
                <img
                  key={img.id}
                  src={img.sourceUrl}
                  alt={img.title}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setIsOverlayShown(true);
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={cx("in-this-project-carousel")}>            
            <Carousel
              slides={filteredResults}
              cardType="asset"
              setIsOverlayShown={setIsOverlayShown}
              personName={personName}
              className={carouselCx(
                !frontPageCarousel && "template-page-carousel"
              )}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default InThisProjectSection;
