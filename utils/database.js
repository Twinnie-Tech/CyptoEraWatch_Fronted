import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async()=>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log('Mongodb is already connected ');
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"crypto",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
        });
        isConnected = true;
        console.log('Mongodb is connected');
    }catch(error){
        console.log(error);
    }
}