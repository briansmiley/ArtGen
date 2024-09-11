/* eslint-disable react-hooks/exhaustive-deps */
//component which loads the 10 most recently created artblocks from the database and displays them

"use client";

import { useEffect, useRef, useState } from "react";
import ArtBlock, { ArtBlockProps } from "./ArtBlock";
import { GetArtBlocksResponse } from "@/app/api/feed/route";
import { ArtBlockDataLocal } from "@/services/ArtBlock";
import ArtFeedBlock from "./ArtFeedBlock";
import ArtBlockModal from "./ArtBlockModal";
import useTap from "@/app/hooks/useTap";

//function that returns the sizes the artblocks should be for small and large screens to fit
interface BlockSizeArgs {
  s: number; //number of blocks to fit on small screens
  l: number; //number of blocks to fit on large screens
  breakpoint: number; //breakpoint for switching from small to large
}
//calculates the size of an artblock to fit
const blockSize = () => {
  return (window.innerWidth / blocksPerRow()) * 0.8;
};
const blocksPerRow = () => {
  const counts = { s: 3, l: 5, breakpoint: 640 }; //hard coded data for how mnay blocks to fit on small and large screens
  return window.innerWidth < counts.breakpoint ? counts.s : counts.l;
};
const initialBlockSize = blockSize(); //initial value for useState
/**Query db for a batch of blocks and whether there are more to get */
const fetchArtBlocks = async (
  artBlocks: ArtBlockDataLocal[],
  rowsToFetch: number = 2
): Promise<GetArtBlocksResponse> => {
  const blockFetchCount = rowsToFetch * blocksPerRow();
  try {
    const lastId =
      artBlocks.length > 0 ? artBlocks[artBlocks.length - 1].id : null;
    const response = await fetch(
      `/api/feed?lastId=${lastId}&count=${blockFetchCount}`
    );
    const data: GetArtBlocksResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching art blocks:", error);
    return { artBlocks: [], moreToFetch: false };
  }
};
export default function ArtFeed() {
  const [artBlocks, setArtBlocks] = useState<ArtBlockDataLocal[]>([]); //array of ArtBlockDataLocal objects
  const [moreToFetch, setMoreToFetch] = useState(true); //flag sets to false when db says we have exhausted all blocks
  const [showModal, setShowModal] = useState(false); //flag to show modal zoom
  const [currentZoomedBlockData, setCurrentZoomedBlockData] =
    useState<ArtBlockDataLocal>({} as ArtBlockDataLocal); //current block to focus in modal
  const [feedBlockSize, setFeedBlockSize] = useState(initialBlockSize); //size for artblocks in the feed
  const [loading, setLoading] = useState(false); //flag to show loading state

  //function to set the current zoomed block data and show modal
  const onFullscreenClick = (artBlock: ArtBlockDataLocal) => () => {
    setCurrentZoomedBlockData(artBlock);
    setShowModal(true);
  };
  //Fetch a batch of blocks and add them to state
  const fetchMoreArtBlocks = async () => {
    setLoading(true);
    const data = await fetchArtBlocks(artBlocks);
    setArtBlocks(prev => [...prev, ...data.artBlocks]);
    setMoreToFetch(data.moreToFetch);
    setLoading(false);
  };

  //one time useEffect to set up a resizer for blocks at window resize
  useEffect(() => {
    const changeBlockSize = () => setFeedBlockSize(blockSize());
    window.addEventListener("resize", changeBlockSize);
    return () => window.removeEventListener("resize", changeBlockSize);
  }, []);
  //fetch *one* batch of blocks on initial load
  useEffect(() => {
    setLoading(true);
    const initialSet = async () =>
      setArtBlocks((await fetchArtBlocks(artBlocks)).artBlocks);
    initialSet().then(() => setLoading(false));
  }, []);

  return (
    // Display linear feed of artblocks
    <div className="flex flex-col items-center justify-center">
      <span
        className="text-5xl   mb-5 font-mono font-bold"
        style={{ textShadow: "1px 1px 3px #002000" }}
      >
        ArtGen Feed
      </span>
      {/* display zoomed in focus view */}
      {showModal && (
        <ArtBlockModal
          blockData={currentZoomedBlockData}
          closeOnClick={() => setShowModal(false)}
        />
      )}
      <div className="flex flex-wrap justify-center gap-5 mb-5">
        {artBlocks.map(artBlock => (
          <ArtFeedBlock
            key={artBlock.id}
            {...artBlock}
            size={feedBlockSize}
            onFullscreenClick={onFullscreenClick(artBlock)}
          />
        ))}
        {loading ? (
          [...Array(blocksPerRow() * 2)].map((_, i) => (
            <ArtBlockSkeleton size={feedBlockSize} key={i} />
          ))
        ) : (
          <></>
        )}
      </div>
      {/* button that calls fetchArtBlocks when clicked */}
      {loading ? (
        <span className="loading loading-dots loading-lg "></span>
      ) : (
        <button
          className="btn bg-purple-400 hover:bg-purple-500 border-none mt-3 mb-5"
          onClick={loading ? undefined : fetchMoreArtBlocks}
          disabled={!moreToFetch}
        >
          <span className="text-slate-700">
            {moreToFetch ? "Load More..." : "That's All Folks"}
          </span>
        </button>
      )}
    </div>
  );
}

//placeholder skeletons for loading state
const ArtBlockSkeleton = ({ size }: { size: number }) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="skeleton rounded-xl animate-pulse"
        style={{ height: size, width: size }}
      ></div>
      <div className="flex justify-between">
        <div
          className="skeleton rounded-xl animate-pulse"
          style={{ width: (150 / 350) * size, height: (30 / 350) * size }}
        ></div>
        <div
          className="skeleton rounded-full animate-pulse"
          style={{ width: (50 / 350) * size, height: (30 / 350) * size }}
        ></div>
      </div>
      <div className="flex justify-between">
        <div
          className="skeleton rounded-xl animate-pulse"
          style={{ width: (150 / 350) * size, height: (30 / 350) * size }}
        ></div>
      </div>
    </div>
  );
};
