import styles from "./RelatedItemCard.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import usePersonBySlug from "../../constants/customQueryHooks/usePersonBySlug";

let cx = className.bind(styles);

const RelatedItemCard = ({ node }) => {
  const { title, asset_postId, author, slug, uri, sourceUrl } = node;



  const postTitle = usePersonBySlug(slug)?.data?.title;

  console.log("node", node);

  const imgSrc = node?.personCard?.personInfo?.[0]?.headshot?.node?.sourceUrl;

  return (
    <div key={`${title}-${asset_postId}`} className={cx("RelatedItemCard")}>
      <a href={uri} className={cx("asset-link")}>
        <Image
          // src={node.assetCard.assetInfo.asset_files?.file.node.sourceUrl}
          alt={postTitle}
          src={imgSrc ? imgSrc : "/sample-img.png"}
          width={157}
          height={179}
          layout="fixed"
        />
      </a>
      <div className={cx("card-info")}>
        <a href={`/asset/${slug}`} className={cx("asset-link")}>
          <h3>{postTitle}</h3>
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
