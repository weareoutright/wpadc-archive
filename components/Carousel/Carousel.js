import styles from "./Carousel.module.scss";
import className from "classnames/bind";
import PREV_BTN from "../../assets/icons/previous-btn.svg";
import PREV_BTN_DARK from "../../assets/icons/previous-btn-dark.svg";
import NEXT_BTN from "../../assets/icons/next-btn.svg";
import NEXT_BTN_LIGHT from "../../assets/icons/next-btn-light.svg";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { AssetSearchResultCard } from "../AssetSearchResultCard";
import { FeaturedArtistCard } from "../FeaturedArtistCard";
import HomePageCarouselCard from "../HomePageCarouselCard/HomePageCarouselCard";
import { HomePageFeaturedArtistCard } from "../HomePageFeaturedArtistCard";

let cx = className.bind(styles);

const Carousel = ({
  slides,
  cardType = "asset",
  className,
  personName,
  setIsOverlayShown,
}) => {
  const carouselRef = useRef(null);
  const [isFirstVisible, setIsFirstVisible] = useState(true);
  const [isLastVisible, setIsLastVisible] = useState(false);

  const scrollAmount = 300; // Adjust scroll amount based on item width

  const nextSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += scrollAmount;
    }
  };

  const prevSlide = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= scrollAmount;
    }
  };

  useEffect(() => {
    if (!carouselRef.current || slides?.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.dataset.index === "0") {
            setIsFirstVisible(entry.isIntersecting);
          }
          if (entry.target.dataset.index === `${slides?.length - 1}`) {
            setIsLastVisible(entry.isIntersecting);
          }
        });
      },
      {
        root: carouselRef.current,
        threshold: 0.8, // Adjust as needed to trigger when most of the item is in view
      }
    );

    const items = carouselRef.current.children;
    if (items.length > 0) {
      observer.observe(items[0]); // Observe the first item
      observer.observe(items[items.length - 1]); // Observe the last item
    }

    return () => observer.disconnect();
  }, [slides]);

  return (
    <div
      className={cx(["Carousel", className])}
      style={{ position: "relative", width: "100%" }}
    >
      {/* Controls */}
      <div className={cx("carousel-controls")}>
        <button onClick={prevSlide} disabled={isFirstVisible}>
          <Image
            src={isFirstVisible ? PREV_BTN : PREV_BTN_DARK}
            alt="Previous"
            style={cardType === "artist" ? { filter: "invert(1)" } : {}}
            className={isFirstVisible && "disabled"}
          />
        </button>
        <button
          onClick={nextSlide}
          disabled={isLastVisible}
          className={isLastVisible && "disabled"}
        >
          <Image
            src={isLastVisible ? NEXT_BTN_LIGHT : NEXT_BTN}
            alt="Next"
            style={cardType === "artist" ? { filter: "invert(1)" } : {}}
          />
        </button>
      </div>

      {/* Scrollable Container */}
      <div
        ref={carouselRef}
        className={cx("carousel-items")}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
        }}
      >
        {slides ? (
          slides.map((slide, index) => {
            return (
              <div
                key={index}
                className={cx("carousel-item")}
                data-index={index} // Assign index for reference in observer
              >
                {cardType === "homepage" &&
                  slide.__typename ===
                    "HomeBlocksFeaturedCollectionsAndStories" && (
                    <HomePageCarouselCard
                      node={slide}
                      personName={personName}
                      isHomepageCarouselCard={true}
                    />
                  )}

                {cardType === "homepage" &&
                  slide.node?.__typename === "Person" && (
                    <HomePageFeaturedArtistCard
                      node={slide.node}
                      personName={personName}
                      isHomepageCarouselCard={true}
                    />
                  )}
                {cardType === "asset" && (
                  <AssetSearchResultCard node={slide} personName={personName} />
                )}
                {cardType === "artist" && (
                  <FeaturedArtistCard node={slide} personName={personName} />
                )}
                {cardType === "image" && (
                  <AssetSearchResultCard
                    node={slide}
                    isImageOnly={true}
                    setIsOverlayShown={setIsOverlayShown}
                    personName={personName}
                  />
                )}
              </div>
            );
          })
        ) : (
          <AssetSearchResultCard node={null} />
        )}
      </div>
    </div>
  );
};

export default Carousel;
