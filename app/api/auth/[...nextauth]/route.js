import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile'
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async signIn({ account, profile }) {
      console.log("Account:", account);
      console.log("Profile:", profile);
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@gmail.com");
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect URL:", url);
      return baseUrl;
    },
    async session({ session, token }) {
      console.log("Session:", session);
      console.log("Token:", token);
      return session;
    },
    async jwt({ token, account }) {
      console.log("JWT Token:", token);
      console.log("Account:", account);
      if (account) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
