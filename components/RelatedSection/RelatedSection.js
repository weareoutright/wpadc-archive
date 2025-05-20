import styles from "./RelatedSection.module.scss";
import className from "classnames/bind";
import { RelatedItemCard } from "../RelatedItemCard";

let cx = className.bind(styles);

const RelatedSection = ({ itemsArr, className }) => {
    console.log("itemsArr", itemsArr);
  return (
    <div className={cx("RelatedSection", className)}>
      <h2>Related</h2>
      <div className={cx("RelatedSectionItems")}>
        {itemsArr?.map((node) => (
          // <RelatedItemCard key={node.asset_postId} node={node} />
            //using this for Related items in person
            <RelatedItemCard key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
};

export default RelatedSection;
