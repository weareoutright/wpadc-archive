import styles from "./ContainerHeader.module.scss";
import className from "classnames/bind";
import Link from "next/link";
import RIGHT_ARROW from "../../assets/icons/right-arrow.svg";
import LEFT_ARROW from "../../assets/icons/left-arrow.svg";
import Image from "next/image";

let cx = className.bind(styles);

const ContainerHeader = ({
  programName = "Public Programs",
  artistName = "Artist Name",
  assetName = "Asset Title",
  eventName = "Event Name",
  description = "laboris magna qui aute nulla cupidatat officia sit in cupidatat elit, aliquip in sed labore incididunt elit, magna officia eu pariatur. et proident, Excepteur ex minim anim dolore consequat. ipsum culpa minim aute ut velit aute culpa incididunt proident, ipsum dolor ut laborum. est magna eu anim anim dolor laborum. anim esse dolore in mollit nostrud.",
  tagsArr = [
    { name: "tag1", href: "#" },
    { name: "tag2", href: "#" },
    { name: "tag3", href: "#" },
  ],
  dateBegin = "October 1, 2021",
  dateEnd = "December 1, 2021",
  type = "Type",
  location = "location",
  externalLinksArr = [
    { name: "external-link1", href: "#" },
    { name: "external-link2", href: "#" },
  ],
  pageType = "asset",
  parentLink = { title: "Parent Link", href: "#" },
}) => {
  return (
    <div className={cx("ContainerHeader")}>
      {pageType === "public-programs" ||
        pageType === "content" ||
        (pageType === "event" && (
          <a href={parentLink.href} className={cx("eyebrow-link")}>
            <Image src={LEFT_ARROW} alt="left arrow" />{" "}
            <span>{parentLink.title}</span>
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
            <div className={cx("tag-container")}>
              {tagsArr.map((tag) => (
                <a key={tag.href} className={cx("tag")} href={tag.href}>
                  {tag.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className={cx("right-column")}>
          <div className={cx("meta-data")}>
            {dateBegin && dateEnd && (
              <>
                <small>Date</small>
                <p>
                  {dateBegin} – {dateEnd}
                </p>
              </>
            )}

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
