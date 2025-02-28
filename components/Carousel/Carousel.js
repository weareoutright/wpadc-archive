import styles from "./Carousel.module.scss";
import className from "classnames/bind";
import PREV_BTN from "../../assets/icons/previous-btn.svg";
import NEXT_BTN from "../../assets/icons/next-btn.svg";
import Image from "next/image";
import { useRef } from "react";
import { AssetSearchResultCard } from "../AssetSearchResultCard";
import { FeaturedArtistCard } from "../FeaturedArtistCard";

let cx = className.bind(styles);

const Carousel = ({ slides, cardType, className }) => {
  const carouselRef = useRef(null);

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

  return (
    <div
      className={cx(["Carousel", className])}
      style={{ position: "relative", width: "100%" }}
    >
      {/* Controls */}
      <div className={cx("carousel-controls")}>
        <button onClick={prevSlide}>
          <Image src={PREV_BTN} alt="Previous" />
        </button>
        <button onClick={nextSlide}>
          <Image
            src={NEXT_BTN}
            alt="Next"
            style={cardType === "artist" && { filter: "invert(1)" }}
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
          gap: "10px",
        }}
      >
        {slides ? (
          slides.map((slide, index) => (
            <div key={index} className={cx("carousel-item")}>
              {/** dummy data */}
              {cardType === "asset" && <AssetSearchResultCard node={slide} />}
              {cardType === "artist" && <FeaturedArtistCard node={slide} />}
            </div>
          ))
        ) : (
          <AssetSearchResultCard node={null} />
        )}
      </div>
    </div>
  );
};

export default Carousel;
