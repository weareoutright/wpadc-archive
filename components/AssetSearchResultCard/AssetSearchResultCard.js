const AssetSearchResultCard = ({ node }) => {
  return (
    <div key={node.artwork_postId} className="AssetCard">
      <a href={node.uri} className="artwork-link">
        <h2>{node.title}</h2>
      </a>
      <img
        src={node.artworkCard.artworkInfo.artwork_files?.file.node.sourceUrl}
        alt={node.title}
      />
    </div>
  );
};

export default AssetSearchResultCard;
