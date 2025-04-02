import styles from "./ArtistContainerHeader.module.scss";
import className from "classnames/bind";
import RIGHT_ARROW from "../../assets/icons/right-arrow.svg";
import Image from "next/image";
import DEFAULT_CHECKED_IMAGE from "../../assets/checked-bg-minimal-content.png";

let cx = className.bind(styles);

const ArtistContainerHeader = ({ artistObj }) => {
  const modified = artistObj.modified;
  const date = new Date(modified);
  const monthYear = date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const { fullName, bodyCopy, quote, headshot, externalLinks } =
    artistObj.personCard.personInfo[0];

  return (
    <div className={cx("ArtistContainerHeader")}>
      {artistObj !== null && (
        <>
          <div className={cx("container-header")}>
            <h2>{fullName || ""}</h2>
            <small>Last updated: {monthYear}</small>
          </div>
          <div className={cx("artist-container-header-content")}>
            <div className={cx("left-column")}>
              <div className={cx("description")}>{bodyCopy || ""}</div>
              <figure className={cx("block-quote")}>
                <blockquote>
                  <p>"{quote || ""}"</p>
                </blockquote>
                <figcaption>
                  — <cite>{fullName || ""}</cite>
                </figcaption>
              </figure>
            </div>
            <div className={cx("right-column")}>
              {headshot ? (
                <Image
                  className={cx("artist-headshot")}
                  src={headshot || ""}
                  alt="artist"
                />
              ) : (
                <Image src={DEFAULT_CHECKED_IMAGE} alt="" />
              )}
              <div className={cx("external-links")}>
                {externalLinks &&
                  externalLinks?.map((link) => (
                    <a href={link.href} target="_blank" rel="noreferrer">
                      <span>{link.name} </span>
                      <Image
                        className={cx("right-arrow")}
                        src={RIGHT_ARROW}
                        alt="right arrow"
                      />
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArtistContainerHeader;
