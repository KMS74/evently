import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//  protect all routes in your application and define specific routes as public,
const isPublicRoute = createRouteMatcher([
  "/",
  "/events:id",
  "api/webhook/clerk",
  "api/webhook/stripe",
  "api/webhook/uploadthing",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

// By default, clerkMiddleware will not protect any routes.
export default clerkMiddleware(
  (auth, request) => {
    if (!isPublicRoute(request)) {
      auth().protect();
    }
  },
  { debug: process.env.NODE_ENV === "development" }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
