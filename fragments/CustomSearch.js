import { gql } from "@apollo/client";

export const ArtworkSearchFragment = gql`
  fragment ArtworkSearchFragment on GeneralSettings {
    title
    description
  }
`;
