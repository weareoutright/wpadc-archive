import styles from "./ContainerHeader.module.scss";
import className from "classnames/bind";
import RIGHT_ARROW from "../../assets/icons/right-arrow.svg";
import LEFT_ARROW from "../../assets/icons/left-arrow.svg";
import Image from "next/image";

let cx = className.bind(styles);

const ContainerHeader = ({
  programName,
  artistName,
  assetName,
  eventName,
  description,
  tagsArr,
  dateBegin,
  dateEnd,
  type,
  location,
  externalLinksArr,
  pageType,
  parentLink,
}) => {
  return (
    <div className={cx("ContainerHeader")}>
      {pageType === "public-programs" ||
        pageType === "content" ||
        (pageType === "event" && (
          <a href={parentLink?.href} className={cx("eyebrow-link")}>
            <Image src={LEFT_ARROW} alt="left arrow" />{" "}
            <span>{parentLink?.title}</span>
          </a>
        ))}
      {pageType === "public-programs" && <h2>{programName}</h2>}
      {pageType === "event" && <h2>{eventName}</h2>}
      {pageType === "asset" && <h2>{assetName}</h2>}
      {pageType === "artist" && <h2>{artistName}</h2>}
      {pageType === "content" && <h2>{assetName}</h2>}
      <div className={cx("container-header")}>
        <div className={cx("left-column")}>
          <div className={cx("description")}>{description}</div>

          <div className={cx("tags")}>
            <small>Tags</small>
            {tagsArr && (
              <div className={cx("tag-container")}>
                {tagsArr.map((tag) => (
                  <a key={tag.href} className={cx("tag")} href={tag.href}>
                    {tag.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={cx("right-column")}>
          <div className={cx("meta-data")}>
            {dateBegin ||
              (dateEnd && (
                <>
                  <small>Date</small>
                  <p>
                    {dateBegin} – {dateEnd}
                  </p>
                </>
              ))}

            {type && (
              <>
                <small>Type</small>
                <p>{type}</p>
              </>
            )}

            {pageType === "artist" ||
              (pageType === "event" && (
                <>
                  <small>Artist</small>
                  <p>{artistName}</p>
                </>
              ))}

            {location && (
              <>
                <small>Location</small>
                <p>{location}</p>
              </>
            )}
          </div>
          <div className={cx("external-links")}>
            {externalLinksArr?.map((link) => (
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

export default ContainerHeader;
