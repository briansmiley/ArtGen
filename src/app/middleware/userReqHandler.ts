import { auth, currentUser } from "@clerk/nextjs/server";
import { NextApiHandler } from "next";
import prisma from "../client";

export function userReqHandler(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    //get the clerk id from the clerk provider using auth()
    const { userId } = auth();
    //if there is no logged in user, this middleware does nothing
    if (!userId) {
      return handler(req, res);
    }
    //if there is, look up that user in the database by their clerk id
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId
      }
    });

    //if we find the user, attach their retrieved user object to the request
    if (user) {
      req.user = user;
    }
    //otherwise, create a new user in the db with that clerkID, and email and username taken from the clerk auth()
    else {
      //get the user details from clerk's currentuser
      const curr = await currentUser();

      const newUser = await prisma.user.create({
        data: {
          clerkId: userId,
          email: curr?.emailAddresses[0].emailAddress || "",
          username: curr?.username || ""
        }
      });
      //attach the newly created user object to the request
      req.user = newUser;
    }
    //return the original handler function, with the user object attached to the request
    return handler(req, res);
  };
}
