import styles from "./RelatedItemCard.module.scss";
import className from "classnames/bind";
import Image from "next/image";
import usePersonBySlug from "../../constants/customQueryHooks/usePersonBySlug";
import useAssetsBySlug from "../../constants/customQueryHooks/useAssetsBySlug";
import usePublicProgramsBySlug from "../../constants/customQueryHooks/usePublicProgramsBySlug";
import useStoryBlogsBySlug from "../../constants/customQueryHooks/useStoryBlogsBySlug";

let cx = className.bind(styles);

const RelatedItemCard = ({ node }) => {
  // Debug log for node prop
  console.log('RelatedItemCard node prop:', node);

  // Extract the actual asset data from the nested structure
  const assetNode = node?.manuallySetCards?.nodes?.[0] || node;
  const { title, asset_postId, author, slug, uri, sourceUrl } = assetNode || {};
  
  // Only fetch data if we have a slug
  const assetData = slug ? useAssetsBySlug(slug) : null;
  const publicProgramData = slug ? usePublicProgramsBySlug(slug) : null;
  const storyBlogData = slug ? useStoryBlogsBySlug(slug) : null;

  // Debug logs for asset data
  console.log('Asset Data:', {
    slug,
    assetData,
    assetPostBySlug: assetData?.assetPostBySlug,
    assetCard: assetData?.assetPostBySlug?.assetCard,
    thumbnail: assetData?.assetPostBySlug?.assetCard?.assetCard?.[0]?.thumbnail?.node
  });

  const personTitle = slug ? usePersonBySlug(slug)?.data?.title : null;
  const assetTitle = assetData?.assetPostBySlug?.title;
  const publicProgramTitle = publicProgramData?.publicProgram?.title;
  const storyBlogTitle = storyBlogData?.storyBlog?.title;

  const assetAuthor =
    assetData?.assetPostBySlug?.assetCard?.assetCard?.[0]?.artists?.[0]
      ?.collaborator?.edges?.[0]?.node;
  const imgSrc = assetNode;

  const personThumbnail = assetNode?.personCard?.personInfo?.[0]?.headshot?.node;
  const assetThumbnail = assetData?.assetPostBySlug?.assetCard?.assetCard?.[0]?.thumbnail?.node;

  // Debug logs
  console.log("assetThumbnail:", assetThumbnail);

  // Determine which title to use based on the URI
  const getTitle = () => {
    if (uri?.includes("/person/")) {
      return personTitle;
    }
    if (uri?.includes("/asset/")) {
      return assetData?.assetPostBySlug?.title || title;
    }
    if (uri?.includes("/public-program/")) {
      return publicProgramTitle;
    }
    if (uri?.includes("/story-blog-post/")) {
      return storyBlogTitle;
    }
    return title; // fallback to original title
  };

  // But when creating the link, convert the URI
  const getLink = () => {
    if (uri?.includes("/public-program/")) {
      return uri.replace("/public-program/", "/public-programs/");
    }
    return uri;
  };

  console.log('storyBlogData:', storyBlogData);

  // Get the correct thumbnail based on content type
  const getThumbnail = () => {
    if (uri?.includes('/person/')) {
      return personThumbnail?.sourceUrl || "/sample-img.png";
    }
    if (uri?.includes('/asset/')) {
      return assetData?.assetPostBySlug?.assetCard?.assetCard?.[0]?.thumbnail?.node?.sourceUrl || "/sample-img.png";
    }
    if (uri?.includes('/public-program/')) {
      return publicProgramData?.publicProgram?.programCard?.programCard?.[0]?.thumbnail?.node?.sourceUrl || "/sample-img.png";
    }
    if (uri?.includes('/story-blog-post/')) {
      return storyBlogData?.storyBlog?.storyBlocks?.mainContent?.[0]?.thumbnail?.node?.sourceUrl || "/sample-img.png";
    }
    return "/sample-img.png";
  };

  return (
    <div key={`${title}-${asset_postId}`} className={cx("RelatedItemCard")}>
      <a href={getLink()} className={cx("asset-link")}>
        <Image
          alt={getTitle()}
          src={getThumbnail()}
          width={157}
          height={179}
          layout="fixed"
          objectFit="cover"
          className={cx("related-image")}
        />
      </a>
      <div className={cx("card-info")}>
        <a href={getLink()} className={cx("asset-link")}>
          <h3>{getTitle()}</h3>
        </a>
        {!uri?.includes("/person/") && (
          <a href={assetAuthor?.uri} className={cx("asset-link")}>
            <small>{assetAuthor?.title || author}</small>
          </a>
        )}
      </div>
    </div>
  );
};

export default RelatedItemCard;