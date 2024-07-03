import { clerkMiddleware } from "@clerk/nextjs/server";

let reqRecord = {};

// This Middleware does not protect any routes by default.
// See https://clerk.com/docs/references/nextjs/clerk-middleware for more information about configuring your Middleware
export default clerkMiddleware((auth, req) => {
  console.log("Middling the wares", req.url);
  reqRecord[req.url] = req.nextUrl.pathname;
  console.log(reqRecord);
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/_next(.*)", "/(api|trpc)(.*)"]
};
