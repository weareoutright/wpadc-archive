import styles from "./FeaturedArtistCard.module.scss";
import className from "classnames/bind";
import Image from "next/image";

let cx = className.bind(styles);

const FeaturedArtistCard = ({ node = null }) => {
  if (node) {
    const { people_postId, author, slug } = node;
    return (
      <div
        key={`${author}-${people_postId}`}
        className={cx("FeaturedArtistCard")}
      >
        <a href={`/artists/${slug}`} className={cx("asset-link")}>
          <Image
            // src={node.assetCard.assetInfo.asset_files?.file.node.sourceUrl}
            alt={author}
            src="/sample-img.png"
            width={254}
            height={254}
            layout="fixed"
            className={cx("asset-image")}
          />
        </a>
        <a href={`/artists/${author}`} className={cx("asset-link")}>
          <h3> {author}</h3>
        </a>

        <small># pieces archived</small>
      </div>
    );
  } else {
    return (
      <div className={cx("ArtistCard")}>
        <div className={cx("asset-link")}>
          <Image
            alt=""
            src="/checked-bg-minimal-content.png"
            width={254}
            height={254}
            layout="fixed"
          />
          <h3>Author Name</h3>
        </div>
        <small># pieces archived</small>
      </div>
    );
  }
};

export default FeaturedArtistCard;
