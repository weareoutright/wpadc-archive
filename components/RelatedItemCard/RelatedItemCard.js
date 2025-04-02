import styles from "./RelatedItemCard.module.scss";
import className from "classnames/bind";
import Image from "next/image";

let cx = className.bind(styles);

const RelatedItemCard = ({ node }) => {
  const { title, asset_postId, author, slug } = node;
  return (
    <div key={`${title}-${asset_postId}`} className={cx("RelatedItemCard")}>
      <a href={`/asset/${slug}`} className={cx("asset-link")}>
        <Image
          // src={node.assetCard.assetInfo.asset_files?.file.node.sourceUrl}
          alt={title}
          src="/sample-img.png"
          width={157}
          height={179}
          layout="fixed"
        />
      </a>
      <div className={cx("card-info")}>
        <a href={`/asset/${slug}`} className={cx("asset-link")}>
          <h3>{title}</h3>
        </a>
        <a
          href={`/person/${author}?roleType=artist`}
          className={cx("asset-link")}
        >
          <small>{author ? author : "Author Name"}</small>
        </a>
      </div>
    </div>
  );
};

export default RelatedItemCard;
