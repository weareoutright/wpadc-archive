import { capitalizeString } from "../../constants/capitalizeString";

const PersonSearchResultCard = ({ node }) => {
  return (
    <div key={node.uri} className="PersonCard">
      <img
        src={node.personCard.personInfo[0].headshot?.node.sourceUrl}
        alt={node.personCard.personInfo[0].headshot?.node.title}
        className="headshot"
      />

      <a href={node.uri} className="person-link">
        <h2>{node.personCard.personInfo[0].fullName ?? "N/A"}</h2>
      </a>

      <p>Location: {node.personCard.personInfo[0].location ?? "N/A"}</p>
      <p>
        Start Year: {node.personCard.personInfo[0].activeSinceYear ?? "N/A"}
      </p>

      <p>
        Status:{" "}
        {node.personCard.personInfo[0].currentlyActive
          ? "Currently Active"
          : "Not Active"}
      </p>

      <div>
        <strong>Title(s): </strong>
        <ul>
          {node.personCard.personInfo[0].roleType.edges.map(({ node }) => (
            <li key={node.id}>{capitalizeString(node.roleType?.role_type)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PersonSearchResultCard;
