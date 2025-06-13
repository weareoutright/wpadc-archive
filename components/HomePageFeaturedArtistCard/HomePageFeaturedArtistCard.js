import styles from "../AssetSearchResultCard/AssetSearchResultCard.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

let cx = classNames.bind(styles);

const stripLocalDomain = (url) => {
  return url.replace(/^https?:\/\/wpadc-archive-dev\.local/, "");
};

const HomePageFeaturedArtistCard = ({ node }) => {
  return (
    <div key={node.id} className={cx("AssetCard")}>
      <a href={stripLocalDomain(node.link)} className={cx("asset-link")}>
        {node.personCard?.personInfo?.[0].headshot ? (
          <Image
            src={node.featuredImage?.sourceUrl}
            alt={node.title}
            className={cx("asset-image")}
            width={244}
            height={320}
            layout="fixed"
          />
        ) : (
          <Image
            src="./checked-bg-minimal-content.png"
            alt=""
            className={cx("asset-image")}
            width={244}
            height={320}
            layout="fixed"
          />
        )}

        <h3>{node.title}</h3>
      </a>
    </div>
  );
};

export default HomePageFeaturedArtistCard;
