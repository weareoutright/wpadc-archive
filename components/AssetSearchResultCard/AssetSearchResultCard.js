import styles from "./AssetSearchResultCard.module.scss";
import className from "classnames/bind";
import SAMPLE_IMG from "../../assets/sample-img.png";

let cx = className.bind(styles);

const AssetSearchResultCard = ({ node }) => {
  const { title, artwork_postId, uri, author } = node;
  return (
    <div key={`${title}-${artwork_postId}`} className={cx("AssetCard")}>
      <img
        // src={node.artworkCard.artworkInfo.artwork_files?.file.node.sourceUrl}
        alt={title}
        src={SAMPLE_IMG}
      />
      <a href={uri} className={cx("artwork-link")}>
        <h2>{title}</h2>
      </a>
      <small>{author ? author : "Author Name"}</small>
    </div>
  );
};

export default AssetSearchResultCard;
