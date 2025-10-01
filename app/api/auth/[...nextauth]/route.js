import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@utils/database";
import User from "../../models/user.ts";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Connect to the database
          await connectToDB();

          if (!credentials.email || !credentials.password) {
            throw new Error("Email and password are required");
          }

          // Find the user by email
          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );
          if (!user) {
            throw new Error("No user found with this email");
          }
          // Verify the password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          // Return the user object
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.userName,
            image: user.image,
            role: user.role,
          };
        } catch (error) {
          console.error("Error in credentials authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async signIn({ user }) {
      return true; // Allow all users to sign in
    },
  },
});

export { handler as GET, handler as POST };
