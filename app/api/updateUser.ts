import { connectToDB } from "@utils/database";
import User from "./models/user";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const updateUser = async () => {
  try {
    // Connect to the database
    await connectToDB();

    // Original password to hash
    const originalPassword = "37874493";

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(originalPassword, saltRounds);

    // Update the user document
    const result = await User.updateOne(
      { email: "samuelkamotho47@gmail.com" }, // Filter by user email
      {
        $set: {
          password: hashedPassword,
          email: "samuelkamotho47@gmail.com",
          userName: "samuelkamotho",
          image:
            "https://lh3.googleusercontent.com/a/ACg8ocInriFUuLWNNgToG4WozkJrz8C1ccjVU9tAg4ZtVd87j7us0g=s96-c",
          role: "user",
        },
      }
    );

    return new Response(
      JSON.stringify({ message: "User updated successfully" }),
      { status: 200 }
    );
  } catch (e) {
    console.error("Error updating user", e);
    return new Response(JSON.stringify({ error: "Failed to update user" }), {
      status: 500,
    });
  } finally {
    mongoose.connection.close();
  }
};

export default updateUser;
