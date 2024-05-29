import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import {connectToDB} from "@utils/database";
import User from "../../models/user";
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    callbacks:{
        async session({session}) {
            console.log(session);
            const sessionUser = await User.findOne({
            email:session.user.email
            });
            console.log(sessionUser,"user");
            session.user.id = sessionUser._id.toString();
            return session;
        },
        async signIn({profile}){
            try{
            await connectToDB();
            //check if user is already created if not create
            const userExists  = await User.findOne({
            email:profile.email
            });
            console.log(userExists,"user already exists");
            if(!userExists) {
                await User.create({
                    email:profile.email,
                    userName:profile.name.replace(" ", "").toLowerCase(),
                    image:profile.picture,
                    role: profile.role
                });
            }
            return true;
            }catch(error){
            return false;
            }
            }
    }
})
export {handler as GET, handler as POST}