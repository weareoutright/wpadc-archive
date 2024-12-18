import styles from "./AssetSearchResultCard.module.scss";
import className from "classnames/bind";
import Image from "next/image";

let cx = className.bind(styles);

const AssetSearchResultCard = ({ node }) => {
  const { title, asset_postId, uri, author, slug } = node;
  return (
    <div key={`${title}-${asset_postId}`} className={cx("AssetCard")}>
      <Image
        // src={node.assetCard.assetInfo.asset_files?.file.node.sourceUrl}
        alt={title}
        src="/sample-img.png"
        width={244}
        height={326}
        layout="fixed"
      />
      <a href={`/assets/${slug}`} className={cx("asset-link")}>
        <h2>{title}</h2>
      </a>
      <small>{author ? author : "Author Name"}</small>
    </div>
  );
};

export default AssetSearchResultCard;
