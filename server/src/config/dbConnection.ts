import mongoose from "mongoose";

const connectDb = async () => {
    try{
        console.log("trying to connect");
        const connect = await mongoose.connect("mongodb+srv://hasanberkay:geda3438@cluster0.kybebt3.mongodb.net/test")
        console.log(
            "Database connected",
            connect.connection.host,
            connect.connection.name,
        )

    }catch(err){
        console.log(err)
        process.exit(1)

    }

}

export default connectDb