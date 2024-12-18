import { gql } from "@apollo/client";

export const AssetSearchFragment = gql`
  fragment AssetSearchFragment on GeneralSettings {
    title
    description
  }
`;
