import styles from "./Carousel.module.scss";
import className from "classnames/bind";
import PREV_BTN from "../../assets/icons/previous-btn.svg";
import NEXT_BTN from "../../assets/icons/next-btn.svg";
import Image from "next/image";

let cx = className.bind(styles);

import { useState } from "react";
import { AssetSearchResultCard } from "../AssetSearchResultCard";

const Carousel = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div
      className={cx("Carousel")}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <div className={cx("carousel-controls")}>
        <button onClick={prevSlide}>
          <Image src={PREV_BTN} />
        </button>
        <button onClick={nextSlide}>
          <Image src={NEXT_BTN} />
        </button>
      </div>
      <div
        className={cx("carousel-items")}
        style={{
          display: "flex",
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: "transform 0.5s ease",
        }}
      >
        {/* {slides.map((slide, index) => (
          <div key={index} style={{ minWidth: "100%", height: "300px" }}>
            <img
              src={slide}
              alt={`Slide ${index}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))} */}
        <AssetSearchResultCard
          node={{
            title: "sample",
            asset_postId: "hello",
            uri: "hello",
            author: "sample",
            slug: "letting-go-documentation",
          }}
        />
        <AssetSearchResultCard
          node={{
            title: "sample",
            asset_postId: "hello",
            uri: "hello",
            author: "sample",
            slug: "letting-go-documentation",
          }}
        />
        <AssetSearchResultCard
          node={{
            title: "sample",
            asset_postId: "hello",
            uri: "hello",
            author: "sample",
            slug: "letting-go-documentation",
          }}
        />
        <AssetSearchResultCard
          node={{
            title: "sample",
            asset_postId: "hello",
            uri: "hello",
            author: "sample",
            slug: "letting-go-documentation",
          }}
        />
        <AssetSearchResultCard
          node={{
            title: "sample",
            asset_postId: "hello",
            uri: "hello",
            author: "sample",
            slug: "letting-go-documentation",
          }}
        />
        <AssetSearchResultCard
          node={{
            title: "sample",
            asset_postId: "hello",
            uri: "hello",
            author: "sample",
            slug: "letting-go-documentation",
          }}
        />
        <AssetSearchResultCard
          node={{
            title: "sample",
            asset_postId: "hello",
            uri: "hello",
            author: "sample",
            slug: "letting-go-documentation",
          }}
        />
        <AssetSearchResultCard
          node={{
            title: "sample",
            asset_postId: "hello",
            uri: "hello",
            author: "sample",
            slug: "letting-go-documentation",
          }}
        />
        <AssetSearchResultCard
          node={{
            title: "sample",
            asset_postId: "hello",
            uri: "hello",
            author: "sample",
            slug: "letting-go-documentation",
          }}
        />
      </div>
    </div>
  );
};

export default Carousel;
