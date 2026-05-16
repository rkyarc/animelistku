// validasi route user
// export { default } from "next-auth/middleware"
// export const config = { matcher: ["/users/:path*"] }

// import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: ["/users/:path*"],
}