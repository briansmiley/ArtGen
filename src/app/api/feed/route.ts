//route which returns the specified number of most recent artblocks from the database starting after the id of the last artblock already in the feed

import prisma from "@/app/client";
import { NextResponse } from "next/server";
import { ArtBlock as ArtBlockSchema } from "@prisma/client";

export interface FeedGetResponse {
  artBlocks: ArtBlockSchema[];
  moreToFetch: boolean;
}
export async function GET(
  req: NextRequest
): Promise<NextResponse<FeedGetResponse | { error: string }>> {
  const params = req.nextUrl.searchParams;
  const lastId = params.get("lastId") === "null" ? null : params.get("lastId");
  const count = params.get("count");
  console.log(params);
  try {
    const artBlocks = await prisma.artBlock.findMany({
      take: count ? parseInt(count) + 1 : 1, //take the number of blocks plus one to see if there's more to fetch
      skip: lastId ? 1 : 0, //skip the first block if we're not starting from the beginning
      cursor: lastId ? { id: lastId } : undefined, //start from the last block in the feed if we're not starting from the beginning
      orderBy: { id: "desc" } //order by id in descending order
    });
    const data = artBlocks.slice(0, count ? parseInt(count) : 1); //slice off the extra block
    console.log(
      `Fetched ${artBlocks.length} blocks, sending back ${data.length}:`,
      data
    );
    return NextResponse.json({
      artBlocks: data,
      moreToFetch: artBlocks.length > data.length
    });
  } catch (error) {
    console.error("Error fetching ArtBlocks:", error);
    return NextResponse.json(
      { error: "Failed to fetch ArtBlocks" },
      { status: 500 }
    );
  }
}
