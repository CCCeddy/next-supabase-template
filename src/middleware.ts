export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/protected/:path*", "/profile(.*)"], // Protect specific routes
};