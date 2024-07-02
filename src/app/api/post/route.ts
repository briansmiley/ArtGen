import { userReqHandler } from "@/app/middleware/userReqHandler";
import prisma from "../../client";
import { NextApiRequest, NextApiResponse } from "next";
//
export const post = userReqHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const color = req.body.color;
    if (!color) {
      return res.status(400).json({ error: "Color is required" });
    }

    return await prisma.artBlock.create({
      data: {
        color: color,
        userId: req.user!.id
      }
    });
  }
);
