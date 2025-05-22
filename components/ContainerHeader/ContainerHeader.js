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
      {(pageType === "public-programs" || pageType === "content" || pageType === "event") && (
          <a href={parentLink?.uri} className={cx("eyebrow-link")}>
            <Image src={LEFT_ARROW} alt="left arrow" />{" "}
            <span>{parentLink?.title}</span>
          </a>
        )}
      {pageType === "public-programs" && <h2>{programName}</h2>}
      {pageType === "event" && <h2>{eventName}</h2>}
      {pageType === "asset" && <h2>{assetName}</h2>}
      {pageType === "person" && <h2>{artistName}</h2>}
      {pageType === "content" && <h2>{assetName}</h2>}
      <div className={cx("container-header")}>
        <div className={cx("left-column")}>
          <div className={cx("description")}>{description}</div>

          {tagsArr && tagsArr.length > 0 && (
              <div className={cx("tags")}>
                {tagsArr && tagsArr.length > 0 && (
                  <div className={cx("tags")}>
                    <small>Tags</small>
                    <div className={cx("tag-container")}>
                      {tagsArr.map((tag) => {
                        if (!tag) return null;

                        // Use .__typename directly on tag (not tag.node)
                        const typeName = tag.__typename;
                        const label = tag.title;

                        if (typeName === "AssetMediumType") {
                          // Link to search page for AssetMediumType
                          return (
                            <span key={tag.slug} className={cx("tag")}>
                              <a href={`/search?term=${encodeURIComponent(tag.slug)}`}>{label}</a>
                            </span>
                          );
                        }

                        // For AssetTag, just show the label (no link)
                        if (typeName === "AssetTag") {
                          return (
                            <span key={tag.uri} className={cx("tag")}>
                              <span>{label}</span>
                            </span>
                          );
                        }

                        // For all other types, link to their uri
                        return (
                          <span key={tag.uri} className={cx("tag")}>
                            <a href={tag.uri}>{label}</a>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
          )}
        </div>
        <div className={cx("right-column")}>
          <div className={cx("meta-data")}>
            {(dateBegin || dateEnd) && (
                <>
                  <small>Date</small>
                  <p>
                    {dateBegin &&
                        new Date(dateBegin).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          timeZone: "UTC",
                        })}
                    {dateBegin && dateEnd && " – "}
                    {(!dateBegin && dateEnd) || (dateBegin && dateEnd) ? (
                        new Date(dateEnd).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          timeZone: "UTC",
                        })
                    ) : null}
                  </p>
                </>
            )}

            {type && (
                <>
                  <small>Type</small>
                  <p>{type}</p>
                </>
            )}

            <div className={cx("collaborators")}>
              {Array.isArray(artistName) && artistName.length > 0 && (
                  <>
                    <small>Artist(s)</small>
                    <p>
                      {artistName.map((artist, index) => (
                        <>
                          <a href={`/person/${artist.toLowerCase().replace(/\s+/g, '-')}`} key={artist}>
                            {artist}
                          </a>
                          {index < artistName.length - 1 ? ', ' : ''}
                        </>
                      ))}
                    </p>
                  </>
              )}
            </div>

            {/* {pageType === "artist" ||
                (pageType === "event" && (
                    <>
                      <small>Artist(s)</small>
                      <p>
                        <a href={`/person/${artistName.toLowerCase().replace(/\s+/g, '-')}`}>
                          {artistName}
                        </a>
                      </p>
                    </>
                ))} */}

            {location && (
                <>
                  <small>Location</small>
                  <p>{location}</p>
                </>
            )}
          </div>
          <div className={cx("external-links")}>
            {externalLinksArr?.map((link) => (
                <a href={link.url} target="_blank" rel="noreferrer">
                <span>
                  {link.label}
                  {"  "}{" "}
                </span>
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
