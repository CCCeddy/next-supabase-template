import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email";
// import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    //   sendVerificationRequest({
    //     identifier: email,
    //     url,
    //     provider: { server, from },
    //   }) {
    //     /* your function */
    //   },
    //   async generateVerificationToken() {
    //     return "ABC123"
    //   },
    // }),
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: 'Credentials',
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials, req) {
    //     // You need to provide your own logic here that takes the credentials
    //     // submitted and returns either a object representing a user or value
    //     // that is false/null if the credentials are invalid.
    //     // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    //     // You can also use the `req` object to obtain additional parameters
    //     // (i.e., the request IP address)
    //     const res = await fetch("/your/endpoint", {
    //       method: 'POST',
    //       body: JSON.stringify(credentials),
    //       headers: { "Content-Type": "application/json" }
    //     })
    //     const user = await res.json()

    //     // If no error and we have user data, return it
    //     if (res.ok && user) {
    //       return user
    //     }
    //     // Return null if user data could not be retrieved
    //     return null
    //   }
    // }),
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
