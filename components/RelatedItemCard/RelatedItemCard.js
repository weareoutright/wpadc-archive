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
  console.log('Node data:', { title, slug, uri });
  
  const postTitle = usePersonBySlug(slug)?.data?.title;
  const assetData = useAssetsBySlug(slug);
  const publicProgramData = usePublicProgramsBySlug(slug);
  const storyBlogData = useStoryBlogsBySlug(slug);
  
  console.log('Hook results:', {
    personData: usePersonBySlug(slug),
    assetData,
    publicProgramData,
    storyBlogData
  });
  
  const assetTitle = assetData?.assetPostBySlug?.title;
  const publicProgramTitle = publicProgramData?.publicProgram?.title;
  const storyBlogTitle = storyBlogData?.storyBlogPostBy?.title;
  
  console.log('Extracted titles:', {
    postTitle,
    assetTitle,
    publicProgramTitle,
    storyBlogTitle
  });
  
  const assetAuthor = assetData?.assetPostBySlug?.assetCard?.assetCard?.[0]?.artists?.[0]?.collaborator?.edges?.[0]?.node;
  const imgSrc = node?.assetCard?.assetInfo?.[0]?.thumbnail?.node?.sourceUrl;

  // Determine which title to use based on the URI
  const getTitle = () => {
    console.log('Getting title for URI:', uri);
    if (uri?.includes('/person/')) {
      console.log('Using person title:', postTitle);
      return postTitle;
    }
    if (uri?.includes('/asset/')) {
      console.log('Using asset title:', assetTitle);
      return assetTitle;
    }
    if (uri?.includes('/public-program/')) {
      console.log('Using public program title:', publicProgramTitle);
      return publicProgramTitle;
    }
    if (uri?.includes('/story-blog-post/')) {
      console.log('Using story blog title:', storyBlogTitle);
      return storyBlogTitle;
    }
    console.log('Using fallback title:', title);
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
