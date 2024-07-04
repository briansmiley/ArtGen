//takes in ArtBlockLocal data as fetched for the feed and displays an ArtBlock using the params along with a created date and user attribution
import ArtBlock from "./ArtBlock";
import { ArtBlockDataLocal } from "@/services/ArtBlock";

type ArtFeedBlockProps = ArtBlockDataLocal;

export default function ArtFeedBlock(props: ArtFeedBlockProps) {
  return (
    <div>
      <ArtBlock artParams={props.artParams} />
      <div>Created at: {props.createdAt.toLocaleString()}</div>
      <div>By: {props.user.username}</div>
    </div>
  );
}
