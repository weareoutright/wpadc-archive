import styles from "./RelatedSection.module.scss";
import className from "classnames/bind";
import { RelatedItemCard } from "../RelatedItemCard";

let cx = className.bind(styles);

const RelatedSection = ({ itemsArr }) => {
  return (
    <div className={cx("RelatedSection")}>
      <h2>Related</h2>
      <div className={cx("RelatedSectionItems")}>
        {itemsArr?.map((node) => (
          <RelatedItemCard key={node.asset_postId} node={node} />
        ))}
      </div>
    </div>
  );
};

export default RelatedSection;
