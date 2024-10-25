import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try{
        // console.log("mongoURi: ", process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb Connected: ${conn.connection.host}`);
    }
    catch(err){
        console.log("error: connection to MongoDB", err.message)
        process.exit(1) // 1 is failure, 0 is success code
    }
 
}