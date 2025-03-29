import styles from "./ArtistContainerHeader.module.scss";
import className from "classnames/bind";
import RIGHT_ARROW from "../../assets/icons/right-arrow.svg";
import Image from "next/image";

let cx = className.bind(styles);

const ArtistContainerHeader = ({ artistObj }) => {
  return (
    <div className={cx("ArtistContainerHeader")}>
      <div className={cx("container-header")}>
        {artistObj?.artistName && <h2>{artistObj.artistName}</h2>}
        <small>Last updated: ####</small>
      </div>
      <div className={cx("artist-container-header-content")}>
        <div className={cx("left-column")}>
          {artistObj?.content && (
            <div className={cx("description")}>{content}</div>
          )}
          {artistObj?.quote && (
            <figure className={cx("block-quote")}>
              <blockquote>
                <p>"{quote}"</p>
              </blockquote>
              <figcaption>
                — <cite>{quote_author}</cite>
              </figcaption>
            </figure>
          )}
        </div>
        <div className={cx("right-column")}>
          {artistObj?.img && (
            <Image
              className={cx("artist-headshot")}
              src={artistObj.img}
              alt="artist"
            />
          )}
          <div className={cx("external-links")}>
            {artistObj?.externalLinksArr &&
              externalLinksArr?.map((link) => (
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
    </div>
  );
};

export default ArtistContainerHeader;
