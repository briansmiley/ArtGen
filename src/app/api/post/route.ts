import { userReqHandler } from "@/middleware/userReqHandler";
import prisma from "../../client";
import { NextResponse } from "next/server";

//uses userReqHandler to get the userID and posts their block to the db
export const POST = userReqHandler(async (req: NextRequest) => {
  const body = await req.json();
  const color = body?.color;
  if (!color) {
    return NextResponse.json({ error: "Color is required" }, { status: 400 });
  }

  try {
    if (!req.user?.id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await prisma.artBlock.create({
      data: {
        color: color,
        userId: req.user.id
      }
    });
  } catch (error) {
    console.error("Error creating ArtBlock:", error);
    return NextResponse.json(
      { error: "Failed to create ArtBlock" },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: "ArtBlock created" }, { status: 201 });
});
