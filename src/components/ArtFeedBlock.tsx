"use client";
//takes in ArtBlockLocal data as fetched for the feed and displays an ArtBlock using the params along with a created date and user attribution
import ArtBlock from "./ArtBlock";
import { ArtBlockDataLocal } from "@/services/ArtBlock";

type ArtFeedBlockProps = ArtBlockDataLocal & {
  onFullscreenClick: () => void;
  size: number;
};

function ArtFeedBlock(props: ArtFeedBlockProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative group">
        <ArtBlock
          artParams={props.artParams}
          size={props.size}
          onTap={props.onFullscreenClick}
          // onTap={() => console.log("tapped")}
        />
        <Fullscreen
          className="hidden absolute top-1 right-1 cursor-pointer bg-slate-600 text-slate-200 opacity-25 hover:opacity-95 rounded-lg p-0.5 group-hover:block"
          size={24}
          onClick={props.onFullscreenClick}
        />
      </div>
      <PostDetails
        createdAt={props.createdAt}
        user={props.user}
        artId={props.id}
        liked={props.likedBy.length > 0}
        likeCount={props.likeCount}
        artType={props.artParams.artType}
      />
    </div>
  );
}
interface PostDetailsProps {
  createdAt: Date;
  user: { username: string };
  artType: string;
  artId: string;
  liked: boolean;
  likeCount: number;
}
import { Download, Fullscreen } from "lucide-react";
import Likes from "./Likes";
import React, { useState } from "react";

const PostDetails = (details: PostDetailsProps) => {
  return (
    <div className="flex flex-row justify-between items-start text-xs">
      <div className="flex flex-col">
        <div className="text-slate-600 font-semibold">
          {formatTimeSince(new Date(details.createdAt))}
        </div>
        <div className="text-slate-700 md:text-s font-semibold">
          {details.user.username}
        </div>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <Likes
          count={details.likeCount}
          liked={details.liked}
          artId={details.artId}
        />
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
    return "a long time ago"; //if we can't find a unit, return a ––––ic message
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

export default React.memo(ArtFeedBlock);
