//route which returns the specified number of most recent artblocks from the database starting after the id of the last artblock already in the feed

import { NextResponse } from "next/server";
import { ArtBlockDataLocal, getArtBlocksFromDb } from "@/services/ArtBlock";
import { userReqHandler } from "@/middleware/userReqHandler";
export interface GetArtBlocksResponse {
  artBlocks: ArtBlockDataLocal[];
  moreToFetch: boolean;
}
export const dynamic = "force-dynamic";
export const GET = userReqHandler(async (req: NextRequest) => {
  //extract the block count and id of end-of-feed from get params
  const params = req.nextUrl.searchParams;
  const lastId = params.get("lastId") === "null" ? null : params.get("lastId");
  const count = parseInt(params.get("count"));
  const username = req.user?.username ? req.user.username : null;
  // if (!count || !lastId) {
  //   return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  // }
  const { artBlocks, moreToFetch } = await getArtBlocksFromDb(
    count,
    lastId,
    username
  );
  return NextResponse.json({ artBlocks, moreToFetch });
});
