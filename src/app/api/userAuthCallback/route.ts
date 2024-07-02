import { userReqHandler } from "@/app/middleware/userReqHandler";
import { redirect } from "next/navigation";

//this is the callback for the user to be redirected to after the user has been authenticated
export const GET = userReqHandler(async req => {
  redirect("/");
});
