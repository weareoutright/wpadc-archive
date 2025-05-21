import styles from "../AssetSearchResultCard/AssetSearchResultCard.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";

let cx = classNames.bind(styles);

const PersonSearchResultCard = ({ node }) => {
  console.log(node.node);
  return (
    <div key={node.node.id} className={cx("AssetCard")}>
      <a href={node.node.uri} className={cx("asset-link")}>
        {node.personCard?.personInfo[0].headshot ? (
          <Image
            src={node.personCard?.personInfo[0].headshot?.node.sourceUrl}
            alt={node.personCard?.personInfo[0].headshot?.node.title}
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

        <h3>{node.node.title}</h3>
      </a>
    </div>
  );
};

export default PersonSearchResultCard;
