import styles from "./FullPageFocusOverlay.module.scss";
import className from "classnames/bind";
import { useState, useEffect } from "react";
import LEFT_ARROW from "../../assets/icons/previous-btn-dark.svg";
import RIGHT_ARROW from "../../assets/icons/next-btn.svg";
import DEFAULT_IMG from "../../assets/checked-bg-minimal-content.png";
import CLOSE_BTN from "../../assets/icons/close-btn-overlay.svg";
import Image from "next/image";

let cx = className.bind(styles);

export default function FullPageFocusOverlay({
  children,
  className,
  setIsOverlayShown,
  isOverlayShown,
  focusedImage,
}) {
  const [display, setDisplay] = useState("block");

  return (
    <div className={cx(["component", className])} style={{ display: display }}>
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
              <Image src={CLOSE_BTN} />
            </a>
          </div>
          <div className={cx("overlay-inner-controls")}>
            <a
              href="#"
              alt="previous image"
              onClick={() => console.log("prev")}
            >
              <Image src={LEFT_ARROW} alt="previous image" />
            </a>
            <Image src={focusedImage || DEFAULT_IMG} alt="current image" />
            <a
              href={null}
              alt="next image"
              onClick={(e) => {
                e.preventDefault();
                console.log("next");
              }}
            >
              <Image src={RIGHT_ARROW} alt="next image" />
            </a>
          </div>
          <div className={cx("overlay-inner-text")}>
            <h2>title</h2>
            <p>
              Publicity photo of Misha Illin's artist book; cover of book,
              upright, photographed on a wicker table in front of a green
              background
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
