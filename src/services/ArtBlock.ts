import prisma from "@/app/client";
import { ArtBlock } from "@prisma/client";
import { ArtBlockParams } from "./ArtBlock.types";
import { NextResponse } from "next/server";

/**ArtBlock fetched data for feed includes artparams and other metadata needed to display the art
 * including username, art ID, and creation date
 */
export interface ArtBlockDataLocal {
  artParams: ArtBlockParams;
  createdAt: Date;
  id: string;
  likeCount: number;
  likedBy: { username: string }[];
  user: { username: string };
}

export async function postArtBlockToDb(
  artParams: ArtBlockParams,
  username: string
) {
  try {
    const createdArtBlock = await prisma.artBlock.create({
      data: {
        artParams: JSON.stringify(artParams), //stringify the params to store in the db
        user: {
          connect: {
            username: username
          }
        }
      }
    });
    console.log("Created ArtBlock:", createdArtBlock);
    return createdArtBlock;
  } catch (error) {
    console.error("Error posting ArtBlock:", error);
  }
}

export async function getArtBlocksFromDb(
  count: number,
  lastId: string,
  username: string
): Promise<{ artBlocks: ArtBlockDataLocal[]; moreToFetch: boolean }> {
  try {
    const artBlocks = await prisma.artBlock.findMany({
      take: count ? count + 1 : 1, //take the number of blocks plus one to see if there's more to fetch
      skip: lastId ? 1 : 0, //skip the first block if we're not starting from the beginning
      cursor: lastId ? { id: lastId } : undefined, //start from the last block in the feed if we're not starting from the beginning
      orderBy: { id: "desc" }, //order by id in descending order
      select: {
        id: true,
        userId: false,
        artParams: true,
        createdAt: true,
        likeCount: true,
        user: {
          select: {
            username: true
          }
        },
        //include data about whether the user has liked the block
        likedBy: {
          where: {
            username: username
          },
          select: {
            username: true
          },
          take: 1
        }
      }
    });
    const data = artBlocks.slice(0, count ? count : 1).map(block => ({
      ...block,
      artParams: JSON.parse(block.artParams as unknown as string)
    })); //slice off the extra block
    console.log(
      `Fetched ${artBlocks.length} blocks, sending back ${data.length}:`,
      data
    );
    console.log(typeof artBlocks[0].artParams);
    return {
      artBlocks: data as ArtBlockDataLocal[],
      moreToFetch: artBlocks.length > data.length
    };
  } catch (error) {
    console.error("Error fetching ArtBlocks:", error);
    return {
      artBlocks: [],
      moreToFetch: false
    };
  }
}

export interface LikeActionResponse {
  success: boolean;
  likeCount: number;
  likedStatus: boolean;
}
/**Attempts to add/remove a like relationship between a user and a post; returns an object with the success status, the end like status, and the end like count*/
export async function userLikeInteraction(
  username: string,
  artId: string,
  adding: boolean
): Promise<LikeActionResponse> {
  //look up the block and check if the user has liked it
  try {
    const likedArtBlock = await prisma.artBlock.findUnique({
      where: {
        id: artId
      },
      //include data about whether the user has liked the block
      include: {
        likedBy: {
          where: {
            username: username
          }
        }
      }
    });
    const alreadyLiked = likedArtBlock?.likedBy.length > 0;
    const currentLikeCount = likedArtBlock?.likeCount;
    if ((adding && alreadyLiked) || (!adding && !alreadyLiked)) {
      return {
        success: false,
        likeCount: currentLikeCount,
        likedStatus: alreadyLiked
      };
    }
    const updatedArtBlock = await prisma.artBlock.update({
      where: {
        id: artId
      },
      data: {
        likedBy: adding
          ? { connect: { username: username } }
          : { disconnect: { username: username } },
        likeCount: { increment: adding ? 1 : -1 }
      },
      include: {
        likedBy: {
          where: {
            username: username
          }
        }
      }
    });
    return {
      success: true,
      likeCount: updatedArtBlock.likeCount,
      likedStatus: updatedArtBlock.likedBy.length > 0
    };
  } catch (error) {
    console.error("Error updating Like: ", error);
    return { success: false, likeCount: 0, likedStatus: false };
  }
}
