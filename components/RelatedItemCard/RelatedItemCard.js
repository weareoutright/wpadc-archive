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
  const assetData = useAssetsBySlug(slug);
  const publicProgramData = usePublicProgramsBySlug(slug);
  const storyBlogData = useStoryBlogsBySlug(slug);

  const personTitle = usePersonBySlug(slug)?.data?.title;
  const assetTitle = assetData?.assetPostBySlug?.title;
  const publicProgramTitle = publicProgramData?.publicProgram?.title;
  const storyBlogTitle = storyBlogData?.storyBlog?.title;

  const assetAuthor =
    assetData?.assetPostBySlug?.assetCard?.assetCard?.[0]?.artists?.[0]
      ?.collaborator?.edges?.[0]?.node;
  const imgSrc = node;

  const personThumbnail = node?.personCard?.personInfo?.[0]?.headshot?.node;
  const assetThumbnail = node?.assetCard?.assetInfo?.[0]?.thumbnail?.node;

  // Determine which title to use based on the URI
  const getTitle = () => {
    if (uri?.includes("/person/")) {
      return personTitle;
    }
    if (uri?.includes("/asset/")) {
      return assetTitle;
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

  return (
    <div key={`${title}-${asset_postId}`} className={cx("RelatedItemCard")}>
      <a href={getLink()} className={cx("asset-link")}>
        <Image
          alt={getTitle()}
          src={"/sample-img.png"}
          width={157}
          height={179}
          layout="fixed"
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
