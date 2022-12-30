import mongoose from "mongoose"

const MongoDbConnect = async () => {
    try{
       await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDb is Connected")
    }
    catch(error){        
        console.log(error)
        console.log("MongoDb is Not Connected")
        process.exit(1)
    }
}

export default MongoDbConnect