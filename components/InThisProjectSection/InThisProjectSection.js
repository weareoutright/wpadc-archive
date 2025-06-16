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
  console.log("InThisProjectSection received:", {
    headerText,
    itemsArrType: itemsArr ? typeof itemsArr : 'null',
    isArray: Array.isArray(itemsArr),
    itemsArr
  });

  const [isOverlayShown, setIsOverlayShown] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  let filteredResults = [];

  if (headerText === "Images") {
    try {
      if (Array.isArray(itemsArr)) {
        // Transform the data into a format that AssetSearchResultCard expects
        filteredResults = itemsArr
          .map(item => ({
            id: item?.file?.node?.id || Math.random().toString(),
            title: item?.file?.node?.title || 'Untitled',
            sourceUrl: item?.file?.node?.sourceUrl,
            caption: item?.file?.node?.caption,
            description: item?.file?.node?.description,
            assetCard: {
              assetCard: [{
                artists: [{
                  collaborator: {
                    edges: [{
                      node: {
                        uri: item?.file?.node?.sourceUrl
                      }
                    }]
                  }
                }]
              }]
            }
          }))
          .filter(Boolean);
      }
      console.log("Transformed results for Images:", filteredResults);
    } catch (error) {
      console.error('Error processing images:', error);
      return null;
    }

    // Don't render the section if there are no image results
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
        <div className={cx("in-this-project")}>
          <div className={cx("in-this-project-carousel")}>
            {headerText === "Images"
              ? filteredResults.map((img, idx) => (
                  <img
                    key={img.id}
                    src={img.sourceUrl}
                    alt={img.title}
                    style={{ cursor: "pointer", maxHeight: "200px", margin: "0 8px" }}
                    onClick={() => {
                      setSelectedImageIndex(idx);
                      setIsOverlayShown(true);
                    }}
                  />
                ))
              : (
                <Carousel
                  slides={filteredResults}
                  cardType={headerText === "Images" ? "image" : "asset"}
                  setIsOverlayShown={setIsOverlayShown}
                  personName={personName}
                  className={carouselCx(
                    !frontPageCarousel && "template-page-carousel"
                  )}
                />
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InThisProjectSection;
