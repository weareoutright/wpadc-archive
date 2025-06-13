import styles from "./AssetSearchResultCard.module.scss";
import className from "classnames/bind";
import Image from "next/image";

let cx = className.bind(styles);

const WPA_STORY_BORDER_COLOR_CLASSES = ["vermillion", "cyan", "indigo"];

const getRandomColor = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const stripLocalDomain = (url) => {
  return url.replace(/^https?:\/\/wpadc-archive-dev\.local/, "");
};

const HomePageCarouselCard = ({ node }) => {
  const { id, title, link, featuredImg } =
    node.featuredCollectionStory.edges[0].node;
  let isWPAStory =
    node.featuredCollectionStory.edges[0].node.__typename === "Post";

  const borderColor = getRandomColor(WPA_STORY_BORDER_COLOR_CLASSES);

  return (
    <div key={`${title}-${id}`} className={cx("AssetCard", "wpa-story")}>
      <a href={stripLocalDomain(link)} className={cx("asset-link")}>
        <Image
          alt={title}
          src={featuredImg?.sourceUrl || "/checked-bg-minimal-content.png"}
          width={244}
          height={320}
          layout="fixed"
          className={cx(
            "asset-image",
            isWPAStory && "wpa-story-border",
            `${borderColor}`
          )}
        />
        {isWPAStory && (
          <span className={cx("wpa-story-banner", `${borderColor}`)}>
            WPA Story
          </span>
        )}
      </a>
      <a href={stripLocalDomain(link)} className={cx("asset-link")}>
        <h3>{title}</h3>
      </a>
    </div>
  );
};

export default HomePageCarouselCard;
