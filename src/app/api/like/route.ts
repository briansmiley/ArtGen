import { userReqHandler } from "@/middleware/userReqHandler";
import { userLikeInteraction } from "@/services/ArtBlock";
import { NextResponse } from "next/server";

export interface LikeRequestBody {
  artId: string;
  adding: boolean;
}

export const POST = userReqHandler(async (req: NextRequest) => {
  const body: LikeRequestBody = await req.json();
  if (!req.user) {
    return NextResponse.json(
      { success: false, likeCount: null, likedStatus: false },
      { status: 401 }
    );
  }
  const username = req.user.username;

  const artId = body?.artId;
  const adding = body?.adding;
  try {
    const response = await userLikeInteraction(username, artId, adding);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error processing like:", error);
    return NextResponse.json(
      { error: "Failed to process like" },
      { status: 500 }
    );
  }
});
