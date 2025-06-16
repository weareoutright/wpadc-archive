import styles from "./FullPageFocusOverlay.module.scss";
import className from "classnames/bind";
import { useState } from "react";
import LEFT_ARROW from "../../assets/icons/previous-btn-dark.svg";
import RIGHT_ARROW from "../../assets/icons/next-btn.svg";
import DEFAULT_IMG from "../../assets/checked-bg-minimal-content.png";
import CLOSE_BTN from "../../assets/icons/close-btn-overlay.svg";
import Image from "next/image";

let cx = className.bind(styles);

export default function FullPageFocusOverlay({
  images = [],
  selectedIndex = 0,
  setSelectedIndex,
  setIsOverlayShown,
}) {
  const [display, setDisplay] = useState("block");
  const current = images[selectedIndex] || {};

  const handlePrev = (e) => {
    e.preventDefault();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };
  const handleNext = (e) => {
    e.preventDefault();
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className={cx(["component", styles.className])} style={{ display: display }}>
      <div className={cx("overlay-container")}>        
        <div
          className={cx("overlay-bg")}
          onClick={() => setIsOverlayShown(false)}
        >
          <span></span>
        </div>
        <div className={cx("overlay-fg")}>          
          <div className={cx("overlay-close-btn")}>            
            <a
              href="#"
              alt="close overlay"
              onClick={() => setIsOverlayShown(false)}
              className={cx("overlay-close-btn-link")}
            >
              <Image src={CLOSE_BTN} alt="close" />
            </a>
          </div>
          <div className={cx("overlay-inner-controls")}>            
            <a href="#" alt="previous image" onClick={handlePrev}>
              <Image src={LEFT_ARROW} alt="previous image" />
            </a>
            <Image
              src={current.sourceUrl || DEFAULT_IMG}
              alt={current.title || "current image"}
              width={400}
              height={500}
              style={{ objectFit: "contain", maxHeight: "60vh", maxWidth: "90vw" }}
            />
            <a href="#" alt="next image" onClick={handleNext}>
              <Image src={RIGHT_ARROW} alt="next image" />
            </a>
          </div>
          <div className={cx("overlay-inner-text")}>            
            <h2>{current.title || ""}</h2>
            <p>{current.caption || current.description || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
