import styles from "./AssetSearchResultCard.module.scss";
import className from "classnames/bind";
import Image from "next/image";

let cx = className.bind(styles);

const AssetSearchResultCard = ({ node = null }) => {
  if (node) {
    const { title, asset_postId, uri, author, slug } = node;
    return (
      <div key={`${title}-${asset_postId}`} className={cx("AssetCard")}>
        <a href={`/assets/${slug}`} className={cx("asset-link")}>
          <Image
            // src={node.assetCard.assetInfo.asset_files?.file.node.sourceUrl}
            alt={title}
            src="/sample-img.png"
            width={244}
            height={326}
            layout="fixed"
          />
          <h3>{title}</h3>
        </a>
        <a href={`/artists/${author}`} className={cx("asset-link")}>
          <small>{author ? author : "Author Name"}</small>
        </a>
      </div>
    );
  } else {
    return (
      <div className={cx("AssetCard")}>
        <div className={cx("asset-link")}>
          <Image
            alt=""
            src="/checked-bg-minimal-content.png"
            width={244}
            height={326}
            layout="fixed"
          />
          <h3>Title</h3>
        </div>
        <small>Author Name</small>
      </div>
    );
  }
};

export default AssetSearchResultCard;
