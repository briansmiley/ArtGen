import { userReqHandler } from "@/app/middleware/userReqHandler";
import { post } from "../post/route";
import { redirect } from "next/navigation";

//this is the callback for the user to be redirected to after the user has been authenticated
export const GET = userReqHandler(async (req, res) => {
  redirect("/");
});
