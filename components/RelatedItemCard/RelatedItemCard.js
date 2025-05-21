import styles from "./RelatedItemCard.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import usePersonBySlug from "../../constants/customQueryHooks/usePersonBySlug";
import useAssetsBySlug from "../../constants/customQueryHooks/useAssetsBySlug";
import usePublicProgramsBySlug from "../../constants/customQueryHooks/usePublicProgramsBySlug";
import useStoryBlogsBySlug from "../../constants/customQueryHooks/useStoryBlogsBySlug";

let cx = className.bind(styles);

const RelatedItemCard = ({ node }) => {
  const { title, asset_postId, author, slug, uri, sourceUrl } = node;
  
  const postTitle = usePersonBySlug(slug)?.data?.title;
  const assetData = useAssetsBySlug(slug);
  const publicProgramData = usePublicProgramsBySlug(slug);
  const storyBlogData = useStoryBlogsBySlug(slug);
  
  const assetTitle = assetData?.assetPostBySlug?.title;
  const publicProgramTitle = publicProgramData?.publicProgram?.title;
  const storyBlogTitle = storyBlogData?.storyBlogPostBy?.title;
  
  const assetAuthor = assetData?.assetPostBySlug?.assetCard?.assetCard?.[0]?.artists?.[0]?.collaborator?.edges?.[0]?.node;
  const imgSrc = node?.assetCard?.assetInfo?.[0]?.thumbnail?.node?.sourceUrl;
  console.log('Asset thumbnail:', imgSrc);

  // Determine which title to use based on the URI
  const getTitle = () => {
    if (uri?.includes('/person/')) {
      return postTitle;
    }
    if (uri?.includes('/asset/')) {
      return assetTitle;
    }
    if (uri?.includes('/public-program/')) {
      return publicProgramTitle;
    }
    if (uri?.includes('/story-blog-post/')) {
      return storyBlogTitle;
    }
    return title; // fallback to original title
  };

  return (
    <div key={`${title}-${asset_postId}`} className={cx("RelatedItemCard")}>
      <a href={uri} className={cx("asset-link")}>
        <Image
          alt={getTitle()}
          src={imgSrc ? imgSrc : "/sample-img.png"}
          width={157}
          height={179}
          layout="fixed"
        />
      </a>
      <div className={cx("card-info")}>
        <a href={uri} className={cx("asset-link")}>
          <h3>{getTitle()}</h3>
        </a>
        {!uri?.includes('/person/') && (
          <a
            href={uri}
            className={cx("asset-link")}
          >
            <small>{assetAuthor?.title || author}</small>
          </a>
        )}
      </div>
    </div>
  );
};

export default RelatedItemCard;
