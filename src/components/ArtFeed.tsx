/* eslint-disable react-hooks/exhaustive-deps */
//component which loads the 10 most recently created artblocks from the database and displays them

"use client";

import { useEffect, useState } from "react";
import { ArtBlock as ArtBlockSchema } from "@prisma/client";
import ArtBlock from "./ArtBlock";

export default function ArtFeed() {
  const [artBlocks, setArtBlocks] = useState<ArtBlockSchema[]>([]);
  //function to add 10 more blocks to the feed
  const fetchArtBlocks = async () => {
    try {
      const lastCreated =
        artBlocks.length > 0 ? artBlocks[artBlocks.length - 1].createdAt : null;
      const count = 10;
      const response = await fetch(
        `/api/feed?lastCreated=${lastCreated}&count=${count}`
      );
      const data = await response.json();
      setArtBlocks(prevArtBlocks => [...prevArtBlocks, ...data]);
    } catch (error) {
      console.error("Error fetching art blocks:", error);
    }
  };
  //fetch one batch of blocks on initial load
  useEffect(() => {
    console.log("fetching art blocks");
    fetchArtBlocks();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      {artBlocks.map(artBlock => (
        <ArtBlock key={artBlock.id} {...artBlock} />
      ))}
      {/* button that calls fetchArtBlocks when clicked */}
      <button className="btn bg-purple-400 mt-3 mb-5" onClick={fetchArtBlocks}>
        Load More...
      </button>
    </div>
  );
}
