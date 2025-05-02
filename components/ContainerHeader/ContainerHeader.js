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
  console.log('tagsArr', tagsArr);
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

          {tagsArr && tagsArr.length > 0 && (
          <div className={cx("tags")}>
            <small>Tags</small>
            {
              tagsArr && (
                <div className={cx("tag-container")}>
                    {tagsArr.map((tag) => {
                      console.log('tag', tag);
                      if (!tag) return null;

                      const isAssetTag = tag?.node?.__typename === "AssetTag";

                      return (
                          <span key={tag.uri} className={cx("tag")}>
                          {isAssetTag ? (
                              <span>{tag.title}</span>
                          ) : (
                              <a href={tag.uri}>{tag.title}</a>
                          )}
                        </span>
                      )


        //             const node = tag?.node;
        //             console.log('node', node);
        //
        //             if (!node) return null; // skip if node is undefined
        //
        //             const isAssetTag = node.__typename === "AssetTag";
        //             const label = node.title || node.slug || "Untitled";
        //             console.log('label', label);
        //
        //             return isAssetTag ? (
        //                 <span key={index} className={cx("tag", "non-clickable")}>
        //   {label}
        // </span>
        //             ) : (
        //                 <a key={index} className={cx("tag")} href={node.uri}>
        //                   {label}
        //                 </a>
        //             );

                  })}
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
                        new Date(dateBegin).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                    {dateBegin && dateEnd && ' – '}
                    {!dateBegin && dateEnd &&
                        new Date(dateEnd).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                    {dateBegin && dateEnd &&
                        new Date(dateEnd).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
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
              {artistName?.length > 0 && (
                  <>
                    <small>Artist(s)</small>
                    <p>{artistName.join(', ')}</p>
                  </>
              )}
            </div>


            {pageType === "artist" ||
                (pageType === "event" && (
                    <>
                      <small>Artist(s)</small>
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
