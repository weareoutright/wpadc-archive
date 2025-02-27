import styles from "./RelatedSection.module.scss";
import className from "classnames/bind";
import Image from "next/image";

let cx = className.bind(styles);

const RelatedSection = ({ itemArr }) => {
  return (
    <div className={cx("RelatedSection")}>
      {itemArr.map((node) => (
        <RelatedItemCard key={node.asset_postId} node={node} />
      ))}
    </div>
  );
};

export default RelatedSection;
