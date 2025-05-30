import styles from "./AssetSearchResultCard.module.scss";
import className from "classnames/bind";
import Image from "next/image";

let cx = className.bind(styles);

const AssetSearchResultCard = ({
  node,
  isImageOnly = false,
  setIsOverlayShown = null,
  personName,
  isPublicProgram = false,
  isWPAStory = false,
}) => {
  if (node && !isPublicProgram) {
    let artistCollaborator =
      node.assetCard.assetCard[0].artists[0].collaborator?.edges[0].node.uri;
    const { id, title, uri, slug } = node;
    return (
      <div
        key={`${title}-${id}`}
        className={cx("AssetCard", isWPAStory && "wpa-story")}
      >
        <a href={uri} className={cx("asset-link")}>
          <Image
            alt={title}
            src="/checked-bg-minimal-content.png"
            width={244}
            height={320}
            layout="fixed"
            className={cx(
              "asset-image",
              isWPAStory && "wpa-story-border",
              "vermillion"
            )}
          />
          {isWPAStory && (
            <span className={cx("wpa-story-banner", "vermillion")}>
              WPA Story
            </span>
          )}
        </a>
        <a href={`/asset/${slug}`} className={cx("asset-link")}>
          <h3>{title}</h3>
        </a>
        <a href={artistCollaborator} className={cx("asset-link")}>
          <small>{personName}</small>
        </a>
      </div>
    );
  } else if (node && isPublicProgram) {
    const { id, title, slug } = node.node;
    return (
      <div
        key={`${title}-${id}`}
        className={cx("AssetCard", isWPAStory && "wpa-story")}
      >
        <a href={"/"} className={cx("asset-link")}>
          <Image
            alt={title}
            src="/checked-bg-minimal-content.png"
            width={244}
            height={320}
            layout="fixed"
            className={cx(
              "asset-image",
              isWPAStory && "wpa-story-border",
              "vermillion"
            )}
          />
          {isWPAStory && (
            <span className={cx("wpa-story-banner", "vermillion")}>
              WPA Story
            </span>
          )}
        </a>
        <a href={`/public-programs/${slug}`} className={cx("asset-link")}>
          <h3>{title}</h3>
        </a>
      </div>
    );
  } else {
    return (
      <div className={cx("AssetCard")}>
        <div className={cx("asset-link")}>
          {!isImageOnly && (
            <Image
              alt=""
              src="/checked-bg-minimal-content.png"
              width={244}
              height={326}
              layout="fixed"
            />
          )}
          {isImageOnly && (
            <a
              href="#"
              onClick={() => setIsOverlayShown(true)}
              alt="Take a closer look"
            >
              <Image
                alt=""
                src="/checked-bg-minimal-content.png"
                width={244}
                height={326}
                layout="fixed"
              />
            </a>
          )}
          {/* {!isImageOnly && <h3>{title}</h3>} */}
        </div>
        {!isImageOnly && <small>{personName}</small>}
      </div>
    );
  }
};

export default AssetSearchResultCard;
