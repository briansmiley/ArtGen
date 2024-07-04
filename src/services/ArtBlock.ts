import prisma from "@/app/client";
import { ArtBlock } from "@prisma/client";
import { ArtBlockParams } from "./ArtBlock.types";

/**ArtBlock fetched data for feed includes artparams and other metadata needed to display the art
 * including username, art ID, and creation date
 */
export interface ArtBlockDataLocal {
  artParams: ArtBlockParams;
  createdAt: Date;
  id: string;
  user: { username: string };
}

export async function postArtBlockToDb(artBlock: ArtBlock, username: string) {
  try {
    const createdArtBlock = await prisma.artBlock.create({
      data: {
        artParams: artBlock.artParams,
        user: {
          connect: {
            username: username
          }
        }
      }
    });
    return createdArtBlock;
  } catch (error) {
    console.error("Error posting ArtBlock:", error);
  }
}

export async function getArtBlocksFromDb(
  count: number,
  lastId: string
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
        user: {
          select: {
            username: true
          }
        }
      }
    });
    const data = artBlocks.slice(0, count ? count : 1); //slice off the extra block
    console.log(
      `Fetched ${artBlocks.length} blocks, sending back ${data.length}:`,
      data
    );
    return {
      artBlocks: data as unknown as ArtBlockDataLocal[],
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
