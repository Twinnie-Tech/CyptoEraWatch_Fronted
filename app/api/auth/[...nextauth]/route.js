import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "../../models/user.ts";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        // Ensure the database connection is established
        await connectToDB();

        // Fetch the user from the database using the email
        const sessionUser = await User.findOne({
          email: session.user.email,
        });

        // Add the user's ID to the session object
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
          session.user.role = sessionUser.role; // Include role if needed
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session; // Return the session even if there's an error
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        //check if user is already created if not create
        const userExists = await User.findOne({
          email: profile.email,
        });
        if (!userExists) {
          await User.create({
            email: profile.email,
            userName: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            role: profile.role,
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
