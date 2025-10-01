import mongoose from "mongoose";
import updateUser from "@app/api/updateUser";
let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "crypto",
    });
    isConnected = true;
    if (isConnected) {
      console.log("Mongodb is connected");
      //await updateUser();
    }
  } catch (error) {
    console.log(error);
  }
};
