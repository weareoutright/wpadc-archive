import styles from "./AssetSearchResultCard.module.scss";
import className from "classnames/bind";
import Image from "next/image";

let cx = className.bind(styles);

const AssetSearchResultCard = ({
  node,
  isImageOnly = false,
  setIsOverlayShown = null,
  personName,
}) => {
  if (node) {
    const { title, asset_postId, uri, author, slug } = node;
    const isWPAstory = false;
    return (
      <div
        key={`${title}-${asset_postId}`}
        className={cx("AssetCard", isWPAstory && "wpa-story")}
      >
        <a href={`/asset/${slug}`} className={cx("asset-link")}>
          <Image
            // src={node.assetCard.assetInfo.asset_files?.file.node.sourceUrl}
            alt={title}
            src="/sample-img.png"
            width={244}
            height={320}
            layout="fixed"
            className={cx(
              "asset-image",
              isWPAstory && "wpa-story-border",
              "vermillion"
            )}
          />
          {isWPAstory && (
            <span className={cx("wpa-story-banner", "vermillion")}>
              WPA Story
            </span>
          )}
        </a>
        <a href={`/asset/${slug}`} className={cx("asset-link")}>
          <h3>{title}</h3>
        </a>
        <a href={`/person/${author}`} className={cx("asset-link")}>
          <small>{personName}</small>
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
