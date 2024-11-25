import React from "react";
import useArtwork from "../../constants/customQueryHooks/useArtwork";
import { useRouter } from "next/router";

const ArtworkPage = () => {
  const router = useRouter();
  const { uri } = router.query;

  const { loading, error, artworkPost } = useArtwork(uri?.join("/"));

  if (loading) {
    return <div className="ArtworkPage">Loading...</div>;
  }

  if (error) {
    return <div className="ArtworkPage">Error: {error.message}</div>;
  }

  if (!artworkPost) {
    return <div className="ArtworkPage">No artwork found for this URI.</div>;
  }

  return (
    <div className="ArtworkPage">
      <h1>{artworkPost.artworkCard.artworkInfo[0].title}</h1>
    </div>
  );
};

export default ArtworkPage;
