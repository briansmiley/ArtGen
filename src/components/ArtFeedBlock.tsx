//takes in ArtBlockLocal data as fetched for the feed and displays an ArtBlock using the params along with a created date and user attribution
import ArtBlock from "./ArtBlock";
import { ArtBlockDataLocal } from "@/services/ArtBlock";

type ArtFeedBlockProps = ArtBlockDataLocal;

export default function ArtFeedBlock(props: ArtFeedBlockProps) {
  return (
    <div className="flex flex-col gap-2">
      <ArtBlock artParams={props.artParams} />
      <PostDetails
        createdAt={props.createdAt}
        user={props.user}
        artType={props.artParams.artType}
      />
    </div>
  );
}
interface PostDetailsProps {
  createdAt: Date;
  user: { username: string };
  artType: string;
}
import { Download, Heart } from "lucide-react";
import { useState } from "react";

const PostDetails = (details: PostDetailsProps) => {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className="flex flex-row justify-between items-start">
      <div className="flex flex-col">
        <div className="text-slate-400 text-xs font-semibold">
          {formatTimeSince(new Date(details.createdAt))}
        </div>
        <div className="text-slate-600 text-s font-semibold">
          {details.user.username}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Heart
          className={` cursor-pointer ${
            isLiked ? "text-red-500" : "text-gray-500 hover:text-black"
          }`}
          size={18}
          fill={isLiked ? "red" : "none"}
          onClick={() => setIsLiked(!isLiked)}
        />
        {details.artType === "tree" && (
          <div
            className="tooltip tooltip-right"
            data-tip="Right click canvas to save image"
          >
            <Download
              className="cursor-pointer text-gray-500 hover:text-black rounded-sm"
              size={18}
            />
          </div>
        )}
      </div>
    </div>
  );
};
/**
 * Parses a Date object into a string indicating the number of the biggest chunk timeUnit since its date.
 */
const formatTimeSince = (date: Date): string => {
  const timeUnits = [
    //time units and the number of seconds in each unit and the maximum number of a given unit to use before moving on to the larger one
    { unit: "second", seconds: 1, max: 59 },
    { unit: "minute", seconds: 60, max: 59 },
    { unit: "hour", seconds: 3600, max: 23 },
    { unit: "day", seconds: 86400, max: 6 },
    { unit: "week", seconds: 604800, max: 1 },
    { unit: "fortnight", seconds: 1209600, max: 2 },
    { unit: "month", seconds: 2592000, max: 11 },
    { unit: "year", seconds: 31536000, max: 100 }
  ];
  const secondsSince = Math.floor((Date.now() - date.getTime()) / 1000); //seconds since the date object was created
  const timeUnit = timeUnits.find(
    unit => secondsSince < unit.seconds * unit.max
  ); //find the smallest unit where we are under the threshhold to move on to a bigger unit
  if (!timeUnit)
    return "a long time ago"; //if we can't find a unit, return a generic message
  else {
    const { unit, seconds } = timeUnit;
    const unitsSince = Math.floor(secondsSince / seconds);
    return `${unitsSince} ${pluralizeWord(unitsSince, unit)} ago`;
  }
};
//formats a word to adds an s if val is not 1
const pluralizeWord = (val: number, word: string): string => {
  return word + (val === 1 ? "" : "s");
};
