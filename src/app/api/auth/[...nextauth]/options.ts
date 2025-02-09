import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      // allowDangerousEmailAccountLinking: true,
    }),
    // Add more providers here
  ],
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: null
  },
  callbacks: {
    // async signIn({ user, account, profile }) {
    //   console.log(user, account, profile)
    //   return true
    // },
    // async redirect({ url, baseUrl }) {
    //   console.log(url, baseUrl)
    //   return baseUrl
    // },
    async session({ session, token, user }) {
      console.log(token, user);
      return session
    },
    async jwt({ token, user, account, profile }) {
      console.log(user, account, profile)
      return token
    }
  },
  // events: {
  //   async signIn(message) {
  //     console.log(message)
  //   },
  //   async signOut(message) {
  //     console.log(message)
  //   },
  //   async linkAccount(message) {
  //     console.log(message)
  //   },
  //   async session(message) {
  //     console.log(message)
  //   },
  //   async createUser(message) {
  //     console.log(message)
  //   },
  //   async updateUser(message) {
  //     console.log(message)
  //   },
  // },
  // debug: true,
}
