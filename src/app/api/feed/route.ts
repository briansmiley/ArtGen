//route which returns the specified number of most recent artblocks from the database starting after the id of the last artblock already in the feed

import { NextResponse } from "next/server";
import { ArtBlockDataLocal, getArtBlocksFromDb } from "@/services/ArtBlock";
export type GetArtBlocksResponse = {
  artBlocks: ArtBlockDataLocal[];
  moreToFetch: boolean;
};
export const mode = "dynamic";
export async function GET(req: NextRequest) {
  //extract the block count and id of end-of-feed from get params
  const params = req.nextUrl.searchParams;
  const lastId = params.get("lastId") === "null" ? null : params.get("lastId");
  const count = parseInt(params.get("count"));
  // if (!count || !lastId) {
  //   return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  // }
  const { artBlocks, moreToFetch } = await getArtBlocksFromDb(count, lastId);
  return NextResponse.json({ artBlocks, moreToFetch });
}
