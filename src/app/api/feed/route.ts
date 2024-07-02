//route which returns the specified number of most recent artblocks from the database starting after the id of the last artblock already in the feed

import prisma from "@/app/client";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const lastCreated =
    params.get("lastCreated") === "null" ? null : params.get("lastCreated");
  const count = params.get("count");

  try {
    const artBlocks = await prisma.artBlock.findMany({
      where: {
        createdAt: {
          lt: lastCreated || undefined
        }
      },
      orderBy: { createdAt: "desc" },
      take: count ? parseInt(count) : 10
    });
    console.log(artBlocks);
    return NextResponse.json(artBlocks);
  } catch (error) {
    console.error("Error fetching ArtBlocks:", error);
    return NextResponse.json(
      { error: "Failed to fetch ArtBlocks" },
      { status: 500 }
    );
  }
}
